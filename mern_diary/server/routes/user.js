const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

let refreshTokens = [];

router.post("/register", async (req, res) => {
    try {
      const salt = 10
      const hashedPassword = await bcrypt.hashSync(req.body.password, salt)
      const username = req.body.username.toLowerCase()
      const newUser = new User({
        username: username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      res.status(200).json(user._id);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
      const username = req.body.username.toLowerCase()
      const user = await User.findOne({username})
      !user && res.status(400).json("wrong username or password")

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong username or password")
      
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      res.status(200).json({_id: user._id, username: user.username, accessToken, refreshToken})
      res.cookie('refreshToken', token, {
        httpOnly: true,
        path: '/refresh_token',
      });
    } catch (err) {
      res.status(500).json(err)
    }
})  

router.post('/logout', (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
})

router.post('/refresh', (req, res) => {
  const { token } = req.body;

  if (!token) { return res.sendStatus(401) }

  if (!refreshTokens.includes(token)) { return res.sendStatus(403) }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      err && console.log(err)
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      refreshTokens.push(refreshToken);

      res.json({ accessToken, refreshToken });
  });
});

const generateAccessToken = user => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr',
  });
};

const generateRefreshToken = user => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};


// const sendAccessToken = (res, req, accesstoken) => {
//   res.send({
//     accesstoken,
//     email: req.body.email,
//   });
// };

// const sendRefreshToken = (res, token) => {
//   res.cookie('refreshtoken', token, {
//     httpOnly: true,
//     path: '/refresh_token',
//   });
// };


module.exports = router