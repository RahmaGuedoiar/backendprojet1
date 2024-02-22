const { isTokenValid } = require('../utiles/jwt');
const jwt=require('jsonwebtoken')
const User = require('../model/User');
const authMiddleware = async (req, res, next) => {
  try {
      const token = req.headers.token;
      if (!token) {
          return res.status(400).json({ msg: "You are not authorized" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err) => {

          const decodedToken = jwt.decode(token)
          console.log(decodedToken);
          if (err) {
              return res.status(400).json({ msg: "Invalid token" });
          } else {
              req.userId = decodedToken.id;
              req.userRole = decodedToken.role; // Changed to req.userRole
              console.log( req.userRole)
              next();
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Something went wrong" });
  }
};

const authorizeRoles =  (requiredRole) => {
  return (req, res, next) => {
      console.log(requiredRole)
      if (req.userRole !== requiredRole) { // Changed to req.userRole
          return res.status(403).json({ msg: "Forbidden: Insufficient role" });
      }
      next();
  };
};

module.exports = { authMiddleware, authorizeRoles };