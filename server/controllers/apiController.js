// Middleware for handling requests to the external API
const fetch = require('node-fetch');

const apiController = {};

apiController.getMuseums = async (req, res, next) => {
  try {
    await fetch('https://data.cityofnewyork.us/resource/fn6f-htvy.json')
      .then(data => data.json())
      .then(data => res.locals.museums = data);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

apiController.mergeFavs = (req, res, next) => {
  try {
    // Need to add a fav property to each museum object.
    res.locals.museums.forEach((museum) => {
      if (res.locals.favorites.includes(museum.name)) museum.fav = true;
      else museum.fav = false;
    })
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = apiController;
