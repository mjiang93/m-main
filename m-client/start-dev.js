const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 M-Client development server running at http://localhost:${port}`);
  console.log('📝 Note: This is a simple static server. For full React development features, use "npm start" after dependencies are installed.');
});