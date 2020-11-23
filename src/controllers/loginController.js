const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const existing_user = await User.findOne({ email });

      if (!existing_user) {
        return res.status(404).json({ message: 'Invalid email or password' });
      }

      if (
        existing_user &&
        (await bcrypt.compare(password, existing_user.password))
      ) {
        return jwt.sign(
          {
            user: {
              _id: existing_user._id,
              username: existing_user.username,
              email: existing_user.email,
            },
          },
          process.env.SECRET,
          (error, token) => {
            return res.status(200).json({
              user: token,
              user_id: existing_user._id,
            });
          }
        );
      } else {
        return res.status(404).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Cannot perform the operation' });
    }
  },
};
