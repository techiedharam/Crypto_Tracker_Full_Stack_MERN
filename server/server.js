const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const CoinDataRouter = require('./routes/CoinDataRouter');

require('dotenv').config();
require('./config/db');
const PORT = process.env.PORT || 8080;

app.get('/server', (req, res) => {
  res.send('Halo, this is backend server');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/coins', CoinDataRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})