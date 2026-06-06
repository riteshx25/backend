const jwt = require('jsonwebtoken');

async function verifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'token not found',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}

module.exports = verifyUser;
