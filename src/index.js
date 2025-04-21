import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js'
import { connectDB } from './config/dbConfig.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());

app. set("view engine", "ejs");

app.set('views', import.meta.dirname + '/views');

app.use('/api', apiRouter);

app.get('/', (req,res) => {
    console.log(import.meta.dirname);
    return res.render('home', {name: 'Dhiraj', age: 20})
});

app.get('/ping', (req,res) => {
    return res.json({
        message: 'pong',
    });
});


app.all('*', (req,res) => { // this piece of code does not work in express 5
    return res.status(404).json({
        message: 'NOT FOUND',
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${ PORT }`);
    connectDB();
})