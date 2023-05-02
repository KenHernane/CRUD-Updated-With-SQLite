const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const members = require("./Members")

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));
app.get('/hello', (req, res) => res.render('hello', {
    title: "Hello App"
}));

app.use('/api/members', require('./routes/api/member'));
app.get('/', (req, res) => res.render("index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));