require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const caseRoutes = require('./routes/caseRoutes');
const measureRoutes = require('./routes/measureRoutes'); // Importar las rutas de Medidas de Protecci��n
const errorHandler = require('./middleware/errorHandler'); // Importar el middleware de manejo de errores

const app = express();
const port = process.env.PORT || 3001;

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined')); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', caseRoutes);
app.use('/api', measureRoutes); // Usar las rutas de Medidas de Protección

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});