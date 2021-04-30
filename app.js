const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const db =require("./config/key").MongoURI;
// creating the database.
mongoose.connect( db,{ useNewUrlParser: true ,useUnifiedTopology: true } )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));


const port=process.env.PORT||5000;
// routing between pages.
app.use('/',require('./routers/homepageuser'));
app.use('/homepageuser',require('./routers/homepageuser'));
app.use('/welcome',require('./routers/index'));
app.use('/users',require('./routers/users'));
app.use('/admineslimanelogin',require('./routers/admins'));
app.listen(port, console.log("Server running on"+port));
