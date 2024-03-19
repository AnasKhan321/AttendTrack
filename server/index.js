require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const cors = require('cors');
const ConnectToMongo = require('./db.js')

app.use(cors());
app.use(express.json());

ConnectToMongo()


app.use('/api/auth' , require('./Routes/auth/Authentication.js')); 
app.use('/api/record' , require('./Routes/Records/record.js'))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });