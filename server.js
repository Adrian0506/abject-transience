const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// app.get('/', (req, res) => {
//   res.send('Sordid details following...')
// })
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log(`Sordid details following at http://localhost:${port}`)
});
