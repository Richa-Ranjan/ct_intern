// index.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: log request details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route 1: Homepage
app.get('/', (req, res) => {
  res.send('📍 Welcome to the Express Home Page!');
});

// Route 2: Contact
app.get('/contact', (req, res) => {
  res.send('📬 Contact Page: You can reach us at contact@example.com');
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).send('❌ 404 - Page Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
