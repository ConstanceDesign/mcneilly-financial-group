import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoutes';

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Logging middleware (should be before routes)
app.use((req, res, next) => {
  console.log(`Incoming request to ${req.method} ${req.originalUrl}`);
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api/contact', contactRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});