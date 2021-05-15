const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('./routes');

require('./database');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});