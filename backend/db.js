const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://AyanProgrammer11:Apple123@inotebookcluster.nzmawnk.mongodb.net/iNotebookDatabase?retryWrites=true&w=majority"

const connectToMongo = async () => {
    try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
    } catch(err) {
        console.log("Failed to Connect");
        console.error(err);
    }
}

module.exports = connectToMongo;