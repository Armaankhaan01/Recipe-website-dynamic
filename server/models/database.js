const mongoose = require('mongoose');
require('dotenv');
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1/Recipe').then(()=>{
//     console.log("MongoDB Connection Successful")
// }).catch((e)=>{
//     console.log('Database not connected')
//     console.log(e);
// });

// console.log(process.env.MONGODB_URI);

mongoose.connect("mongodb://127.0.0.1/Recipe", { usenewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Databse is Connected')
})


//Models
require('./Category')
require('./Recipe')

