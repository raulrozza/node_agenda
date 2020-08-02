require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const {
    checkCsrfError,
    csrfMiddleware,
} = require('./src/middlewares/csrfConfig');
const routes = require('./routes');

const app = express();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(error => console.error(error));

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

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
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares

app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('Access at http://localhost:3000');
    console.log(`Server running at port ${process.env.PORT}`);
});
