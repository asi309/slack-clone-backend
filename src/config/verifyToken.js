const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Not Authorized' });
  }
  const jwtPayload = jwt.verify(token, process.env.SECRET);
  if (!jwtPayload) {
    return res.status(401).json({ message: 'Not Authorized' });
  }
  req.token = token;
  next();
}

module.exports = verifyToken;
