const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const bodyParser= require('body-parser')
require('./server/models/database')
const database = require('./server/models/database');
// Node.js program to demonstrate the
// Process 'warning' Event

// Importing process module
const process = require('process');

// Event 'warning'
process.on('warning', (warning) => {
console.warn("warning stacktrace - " + warning.stack)
});

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
// app.use(bodyParser.json())

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret:'CookingBlogSecretSession',
    saveUninitialized:true,
    resave:true
}))

app.use(flash());
// app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine','ejs');


    // Require static assets from public folder
    app.use(express.static('public'));
    // Set view engine as EJS
    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    // Set 'views' directory for any views 
    // being rendered res.render()
    app.set('views');
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);



//Connect to the database before listening
database.connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})

// app.listen(port,()=>{
//     console.log(`Server Started on port no. ${port}`);
// })