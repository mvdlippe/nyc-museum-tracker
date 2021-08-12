// Middleware for things related to the user - i.e. setting favorites

const User = require('../models/userModels');
const userController = {};

userController.updateFavorites = async (req, res, next) => {
  try {
    console.log('Got into updateFavorites.');
    // General db query
    const allUsers = await User.find({});
    console.log(allUsers);
    // Get the current favorites from the database
    let currentFavs = await User.findOne({ 'name' : 'Matt' }, 'favorites');
    console.log('Got back currentFavs: ', currentFavs, currentFavs.favorites);
    currentFavs = currentFavs.favorites;
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

module.exports = userController;
