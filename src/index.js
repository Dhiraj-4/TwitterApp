import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js'

const app = express();

app.use(express.json());

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
    return res.json({
        message: 'NOT FOUND',
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${ PORT }`);
})