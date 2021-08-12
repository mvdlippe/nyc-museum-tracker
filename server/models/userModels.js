const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const MONGO_URI = 'mongodb+srv://mattAdmin:EnzoKittyCoder2021@cluster0.k4d4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'nyc-museum-app'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


// Create a schema for users
const userSchema = new Schema({
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: Array
});

userSchema.pre(['save', 'get'], function(next) {
  const user = this;
  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    // If there's an error, return it. Otherwise, generate a salt.
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      // If there's an error, return it. Otherwise, generate a hash and overwrite the plaintext password with it.
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model('user', userSchema);
