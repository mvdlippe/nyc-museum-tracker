const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const apiController = require('./controllers/apiController');
const userController = require('./controllers/userController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.join(__dirname, '../build/')));

app.get('/api/', 
  apiController.getMuseums, 
  userController.getFavorites, 
  apiController.mergeFavs, 
  (req, res) => {
    res.status(200).json(res.locals.museums);
});

app.post('/api/',
  apiController.getMuseums,
  userController.getFavorites,
  apiController.mergeFavs,
  (req, res) => {
    res.status(200).json(res.locals.museums);
  }
)

app.post('/favorites/',
  userController.getFavorites,
  userController.updateFavorites, 
  (req, res) => {
    res.status(200).json('Favorites updated.');
});

app.post('/login/', 
  userController.verifyUser,
  (req, res) => {
    res.status(200).json(res.locals.verified);
});

app.post('/signup/',
  userController.createUser,
  (req, res) => {
    res.status(200).json('Created a new account.');
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
