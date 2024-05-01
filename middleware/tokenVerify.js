const jwt = require('jsonwebtoken');


async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    
    req.decoded = decoded;
    next();
  } catch (err) {
    console.error("Token Error:", err);
    return res.sendStatus(403);
  }
}

module.exports = authenticateToken;

