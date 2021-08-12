// Middleware for things related to the user - i.e. setting favorites

const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const userController = {};

userController.updateFavorites = async (req, res, next) => {
  try {
    // current favs are stored in res.locals.favorites
    let currentFavs = res.locals.favorites;
    // Check to see if the new favorite is in the currentFavs. Add it if it is not; otherwise remove it
    const favIndex = currentFavs.indexOf(req.body.name);
    if (favIndex === -1) currentFavs.push(req.body.name);
    else currentFavs.splice(favIndex, 1);
    // Update the record with the new favorites array
    res.locals.favorites = await User.findOneAndUpdate({ name : 'Matt' }, { favorites : currentFavs.sort() });
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.getFavorites = async (req, res, next) => {
  try {
    // Get favorites data out of the database and set it to res.locals.favorites
    console.log(req.body);
    let currentFavs = await User.findOne({ name : 'Matt' }, 'favorites');
    currentFavs = currentFavs.favorites;
    res.locals.favorites = currentFavs;
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.createUser = async (req, res, next) => {
  try {
    const doc = await User.create({
      name: req.body.username,
      password: req.body.password,
      favorites: [],
    });
    res.locals.created = true;
    return next();
  } catch (err) {
    return next(err);
  }
}

userController.verifyUser = async (req, res, next) => {
  try {
    const doc = await User.findOne({ 'name' : req.body.username });
    const hash = doc.get('password');
    bcrypt.compare(req.body.password, hash, function(err, result) {
      res.locals.verified = result;
      return next();
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = userController;
