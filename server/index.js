const express = require('express');
const userRouter = require('./routes/userRouter'); // import the router
const todoRouter = require('./routes/todoRouter'); // import the router
const mongoose = require('mongoose');
require('dotenv').config(); // import the dotenv
const bodyParser = require('body-parser'); // import body-parser
const app = express(); // create an instance of express


app.use(bodyParser.json()); // use body-parser


// connect to mongodb
mongoose.connect(`mongodb+srv://ern:${process.env.DB_PASSWORD}@ern.rjqf3.mongodb.net/?retryWrites=true&w=majority`,  
        (err) => {
            if (err) { // if error connecting to db
                console.log('Failed to Connect to Database ! ❌  Error :  ' + err);
            } else { // if connected to db
                console.log('Connected to MongoDB ✅');
            }
        }
)





app.get('/', (req, res) => { // default route
    res.sendFile('./public/', { root: __dirname });
})

app.use('/auth', userRouter) // use the auth router for user
app.use('/todos', todoRouter) // use the todo router





app.listen(2323,() => { // listen on port 2323
    console.log('Server is running on port 2323...');
})

