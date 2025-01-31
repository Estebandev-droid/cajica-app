const File = require('../models/File');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit size to 10MB
  }
}).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Error uploading file: ${err.message}` });
      }
      return res.status(400).json({ message: err.message || 'Error uploading file' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const newFile = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });

    try {
      await newFile.save();
      res.status(200).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
      res.status(500).json({ message: 'Error saving file information', error });
    }
  });
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(path.resolve(file.filePath));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching file', error });
  }
};