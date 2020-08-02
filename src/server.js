require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const csrfConfig = require('./middlewares/csrfConfig');
const errorHandler = require('./middlewares/errorHandler');
const flashConfig = require('./middlewares/flashConfig');
const routes = require('./routes');

const app = express();

const sessionOptions = session({
    secret: process.env.SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
});

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(error => console.error(error));

// Various Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(sessionOptions);
app.use(flash());

// Views Config
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// CSRF Middlewares
app.use(csrf());
app.use(errorHandler);
app.use(csrfConfig);

// Flash Messages
app.use(flashConfig);

// Routes
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Access at http://localhost:${process.env.PORT}`);
    console.log(`Server running at port ${process.env.PORT}`);
});
