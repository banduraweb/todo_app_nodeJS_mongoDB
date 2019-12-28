const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressHandlebars = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const path = require('path');
const config = dotenv.config().parsed;
const PORT = config.PORT;
const app = express();
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine );
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);


async function start() {
    try {

        await mongoose.connect(config.DB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
        });


        app.listen(PORT, ()=> {
            console.log('listenning....');
        });

    } catch (e) {
        console.log(e);
    }
}

start();

