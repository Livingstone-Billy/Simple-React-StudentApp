let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");

//express route
const studentRoute = require("../backend/routes/student.routes");
const { configure } = require("@testing-library/react");

// configure mongodb database

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

//connecting to localhost db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(()=>{
    console.log("Database Connected Successfully!")
}, error =>{
    console.log("Could not connect to database: " +error)
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/students', studentRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})

//404 error
app.use((req,res,next)=>{
    res.status(404).send('Error 404!')
});

app.use((err,req,res,next)=>{
    console.error(err.message);

    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});