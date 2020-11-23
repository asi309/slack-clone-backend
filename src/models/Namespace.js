const mongoose = require('mongoose');

const NamespaceSchema = new mongoose.Schema({
  title: String,
  endpoint: String,
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Namespace', NamespaceSchema);
