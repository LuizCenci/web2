const middlewares = require( './middlewares/middlewares');
const routes = require('./routers/route');
const handlebars = require('express-handlebars');
var cookieParser = require ( 'cookie-parser');
var session = require('express-session');
const express = require('express');
const app = express();

app.use(cookieParser());
app.use(session({
    secret:'secret',
    cookie:{maxAge:30*60*1000},
    resave: false,
    saveUninitialized: false,
}));

require('./models');    
  
const db = require('./config/db_sequelize');

(async () => {
  try {
    await db.sequelize.authenticate();

    await db.sequelize.sync({ alter: true }); 
    //db.Usuario.create({login:'admin', senha:'1234', tipo:1});
  } catch (err) {
    console.error('Nao conectou com o bd', err);
  }
})();

app.use(middlewares.logRegister, middlewares.sessionControl);

app.engine('handlebars', handlebars.engine({
  defaultLayout:'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }, 
}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

app.use(
  express.urlencoded({
  extended: true
  })
)

app.listen(8081, function(){
    console.log("Servidor no http://localhost:8081")
});