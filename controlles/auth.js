const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

let login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Make sure to register first!" });
      } else {
        const verifyPw = await bcrypt.compare(password, user.password);
        if (!verifyPw) {
          return res.status(400).json({ msg: "incorrect password" });
        } else {
          // create the user token  that contains the user id and name and role
          const token = await jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_LIFETIME,
            }
          );
          res
            .status(200)
            .json({
              msg: "user logged in Successfully ", token: token,user: user,
            });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "something went wrong", error });
    }
  };

  const register = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array() });
      } else {
        const { name, age, email, password } = req.body;
        const existeUser = await User.findOne({ email: email });
  
        if (existeUser) {
          res.status(400).json({ msg: "User already existe plz login " });
        } else {
          const newUser = await User.create({
            name,
            age,
            email,
            password,
            role: "user",
          }); // Or 'user' for regular users
          console.log(newUser);
          const token = await jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
          res.status(201).json({ msg: "Resister Done!", token });
          const isFirstAccount = (await User.countDocuments({})) === 0;
  
          const role = isFirstAccount ? "admin" : "user";
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "somthing is wrong" });
      console.log(error);
    }
  };
module.exports = { login, register };
