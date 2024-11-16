const mongoose = require('mongoose');
require('dotenv').config()
const connectToDb = ()=>{
    // mongoose.connect('mongodb://127.0.0.1:27017/twitterApp')
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@tweetapp.mef5j.mongodb.net/?retryWrites=true&w=majority&appName=tweetApp`)
    .then(() => console.log('connect to mongodb successfully!'))
    .catch(()=>console.log('error in connecting mongodb'));
}

module.exports = connectToDb;