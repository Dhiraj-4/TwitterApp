import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/apiRoutes.js"
import connectDB from "./config/dbConfig.js";

//Create a new express app/server object
const app = express();

app.use(morgan('combined'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

// app.set('views','')//why this line works, when the views file is in the main project dir ???, without this the html doesn't render 

// app.set('views', import.meta.dirname + '\\views');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
    res.render('index', { name: 'John Doe'});
});

app.use('/api', apiRouter);// if the req url starts with /api, use the apiRouter

app.get('/ping', (req,res) => {
    return res.json({
        message: 'Pong',
    });
})// what to do if someone makes a GET request to /ping;

app.all('*', (req,res) => {
    return res.status(404).json( {
        message: 'NOT FOUND'
    })
});

app.listen(PORT, () => {
    console.log(`Sever is running of ${PORT} port`);
    connectDB();
});