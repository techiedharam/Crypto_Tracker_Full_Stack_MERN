const ensureAuthenticated = require('../middleware/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
  console.log('---- logged in user detail ---', req.user);
  res.status(200).json([
    {
      name: "mobile",
      price: 10000
    },
    {
      name: "tv",
      price: 20000
    },
    {
      name: "laptop",
      price: 45000
    },
    {
      name: "headphones",
      price: 3000
    },
    {
      name: "smartwatch",
      price: 15000
    },
    {
      name: "tablet",
      price: 25000
    },
    {
      name: "camera",
      price: 35000
    },
    {
      name: "speaker",
      price: 8000
    },
    {
      name: "keyboard",
      price: 2500
    },
    {
      name: "mouse",
      price: 1500
    }
  ])
});

module.exports = router;