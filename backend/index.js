const connectToMongo = require('./db'); // Connects the Mongodb atlas
const express = require('express')
const cors = require("cors");
connectToMongo(); // Connecting to Mongodb atlas
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/feedback', require("./routes/feedback"))




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})