const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  namespaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Namespace' }],
});

module.exports = mongoose.model('User', UserSchema);
