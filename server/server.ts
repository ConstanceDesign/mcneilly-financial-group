import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './src/routes/contactRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// API Routes
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;