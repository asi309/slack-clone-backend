const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Required field missing' });
      }

      const existing_user = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (!existing_user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        return jwt.sign(
          {
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
            },
          },
          process.env.SECRET,
          (error, token) => {
            return res.status(201).json({ user: token, user_id: user._id });
          }
        );
      }
      return res
        .status(400)
        .json({ message: 'Email or username already in use' });
    } catch (error) {
      return res.status(500).json({ message: 'Cannot perform the operation' });
    }
  },
  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const existing_user = await User.findById(userId);

      if (!existing_user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        user: {
          _id: existing_user._id,
          username: existing_user.username,
          email: existing_user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Cannot perform the operation' });
    }
  },
};
