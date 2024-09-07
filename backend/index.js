const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const todoRoute = require('./routes/todoRoute')

const app = express();

app.use(cors()); // you can use to allow or restrict cross-origin requests to your server.
app.use(bodyParser.json());
app.use('/api/v1', todoRoute)


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`)
})

