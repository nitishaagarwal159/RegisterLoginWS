var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var router = require('./routes/routing');
// var myErrorLogger = require('./utilities/errorlogger');
// var myRequestLogger = require('./utilities/requestlogger');
const passport = require("passport");
const users = require("./routes/api/users");

// var cors = require('cors');
var app = express();
//app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());
// app.use(myRequestLogger);

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  app.use(passport.initialize());

  require("./config/passport")(passport);

  app.use("/api/users", users)

// app.use('/', router);
// app.use(myErrorLogger);


// app.get('/setupdb', (req, res, next) => {
//     create.setupDb().then((data) => {
//         res.send({ message: data })
//     }).catch((err) => {
//         next(err)
//     })
// })

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// app.listen(2500);
// console.log("Server listening in port 2500");


module.exports = app