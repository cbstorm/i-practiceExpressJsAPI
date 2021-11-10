const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('MongoDB connection successfully');
    } catch (error) {
        console.log('MongoDB connection failure', error);
    }
};

module.exports = connectDB;
