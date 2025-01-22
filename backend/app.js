import express from 'express'; 
import morgan from 'morgan';
import connectWithDB from '../backend/db/db.js'
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

const app = express(); 

app.use(morgan('dev')); 

connectWithDB(); 

app.use(express.json()); 
app.use(express.urlencoded({
  extended : true
}))

app.use(cookieParser())

app.use('/users', router)

app.get('/', (req,res) => {
  res.send('Hello I am Your Personal AI ')
})


export default app;
