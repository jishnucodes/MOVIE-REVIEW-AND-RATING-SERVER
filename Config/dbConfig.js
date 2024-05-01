const mongoose = require('mongoose');

async function dbConnection() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('connected to database')
    } catch (error) {
        console.error("connection failed: ", error);
        
    }
}

module.exports = dbConnection;