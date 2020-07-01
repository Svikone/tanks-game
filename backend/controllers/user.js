const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name, email, password: hashPassword,
    });
    await user.save();
    res.send({ message: 'Signup is successful' }).status(200);
  } catch (e) {
    res.send(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const date = await User.findOne({ email });
    if (date) {
      const passwordComparison = await bcrypt.compare(password, date.password);
      if (passwordComparison) {
        await jwt.sign({ email }, 'hello world', (err, token) => {
          res.json({ token });
        });
      } else {
        res.status(500).send('password not found');
      }
    } else {
      res.sendStatus(500).send('there is no such email');
    }
  } catch (e) {
    res.status(500);
  }
};
