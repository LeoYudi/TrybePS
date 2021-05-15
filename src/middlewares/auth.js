const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ msg: 'token not found' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ msg: 'token invalid or expired' });

    req.id = +decoded.id;
    return next();
  });
};