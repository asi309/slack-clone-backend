const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  title: String,
  namespace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Namespace',
  },
  history: [],
});

module.exports = mongoose.model('Room', RoomSchema);
