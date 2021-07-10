import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import routers from './routes/index';
import cors from 'cors';

let app = express();

app.use(cors())
app.options('*', cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))

// const models =require('./models/index');
// (async () => {
//   var a = await models.sequelize.sync();
//   console.log(a);
//   console.log('Connection has been established successfully.');
// })();
var models =require('./models')
models.sequelize.sync()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use('/', routers);


app.listen(process.env.PORT || 8000, () => {
  console.log(`${app.settings.env} server listening 8000`);
});