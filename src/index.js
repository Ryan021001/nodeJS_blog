const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/SortMiddleware');

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

// use middlewares
app.use(sortMiddleware);

//templates engine

app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    desc: 'oi oi-sort-descending',
                    asc: 'oi oi-sort-ascending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>`;
            },
        },
    }),
);
app.set('views', path.join(__dirname, 'resources', 'views')); // set default directory for views
app.set('view engine', '.hbs');

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
