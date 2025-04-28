import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Log the form data 
  console.log('Form submitted:', { name, email, message });

  // Send a success response
  res.status(200).json({ message: 'Form submitted successfully!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});