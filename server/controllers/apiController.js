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

module.exports = apiController;
