const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const apiController = require('./controllers/apiController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.join(__dirname, '../build/')));

app.get('/api/', apiController.getMuseums, (req, res) => {
  res.status(200).json(res.locals.museums);
});

app.post('/favorites/', (req, res) => {
  console.log('Getting a favorites post request from: ', req.body.name);
  res.status(200).json('Got a favorites click.');
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
})

// Universal error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`) });
