const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes')
const mongoose = require('mongoose');

require('dotenv').config();
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);


app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);


mongoose.connect('mongodb+srv://root:abcd1234@e-voting.s4f9wgl.mongodb.net/e-voting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
