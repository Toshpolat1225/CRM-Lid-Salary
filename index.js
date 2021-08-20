const express = require("express");
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");
// const MONGODB_URI =
//   "mongodb+srv://CRM:KEqphP8g2kEEIQTe@cluster0.svpdo.mongodb.net/olmaliq";


const MONGODB_URI = 'mongodb+srv://CRM:4LO3XMlEdzlDseIB@cluster0.sn5ny.mongodb.net/crm'
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const exhbs = require("express-handlebars");
const app = express();
const path = require("path");

//  routes
const adminRouter = require("./routes/admin/admin");
const indexRouter = require("./routes/user/index");

const store = new MongoDbStore({
  collection: "session",
  uri: MONGODB_URI,
});

const hbs = exhbs.create({
  defaultLayout: "admin",
  extname: "hbs",
  partialsDir: path.join(__dirname, "views/partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "secret value",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(csrf());
// app.use(function (req, res, next) {
//   var token = req.csrfToken();
//   res.cookie('XSRF-TOKEN', token);
//   res.locals.csrfToken = token;
//   next();
// });
app.use(flash());
// app.use(varMiddleware);

app.use("/admin",  adminRouter);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

start();
