const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://mattAdmin:EnzoCoderKitty2021@cluster0.k4d4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'users'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// Create a schema for users
const userSchema = new Schema({
  name: String,
  favorites: Array
});

module.exports = mongoose.model('User', userSchema);
