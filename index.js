const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const formRoutes = require('./routes/routes.js');

app.use(cors());
app.use(bodyParser.json());

const port = 5000;

// Connect to the database
const Connection = require('./database/db.js');
const { log } = require('console');
Connection();

// Use form submission routes
app.use('/api/auth', formRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// http://localhost:5000/api/auth/sigin