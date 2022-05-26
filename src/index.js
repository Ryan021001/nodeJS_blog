const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');

// doc file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// connect db
db.connect();

//LAY DU LIEU TU post (req.body.q)

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// use method put, patch,....
app.use(methodOverride('_method'));

//templates engine

app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('views', path.join(__dirname, 'resources', 'views')); // set default directory for views
app.set('view engine', '.hbs');

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
