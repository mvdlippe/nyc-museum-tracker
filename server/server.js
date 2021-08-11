const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use('/build', express.static(path.join(__dirname, '../build/')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
})

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`) });
