const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const apicache = require('apicache');

let cache = apicache.middleware;

const PORT = process.env.PORT || 5000;

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // 10 requests per 10 minutes
});
app.use(limiter);
app.set('trust proxy', 1);

app.use('/api', cache('2 minutes'), require('./routes'));

app.use(cors());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
