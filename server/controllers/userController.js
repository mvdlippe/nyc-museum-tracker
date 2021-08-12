// Middleware for things related to the user - i.e. setting favorites

const User = require('../models/userModels');
const userController = {};

userController.updateFavorites = async (req, res, next) => {
  try {
    // Get the current favorites from the database
    let currentFavs = await User.findOne({ 'name' : 'Matt' }, 'favorites');
    // Check to see if the new favorite is in the currentFavs. Add it if it is not; otherwise remove it
    const favIndex = currentFavs.indexOf(req.body.name);
    if (favIndex === -1) currentFavs.push(req.body.name).sort();
    else currentFavs.splice(favIndex, 1);
    // Update the record with the new favorites array
    res.locals.favorites = await User.findOneAndUpdate({ name : 'Matt' }, { favorites : currentFavs });
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
