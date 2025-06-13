const middlewares = require( './middlewares/middlewares');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const medicoApiRoutes = require('./routers/api/medicoRoutes');
var cookieParser = require ( 'cookie-parser');
var session = require('express-session');
const express = require('express');
const app = express();
app.use(cors());
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Médicos',
            version: '1.0.0',
            description: 'API REST para gerenciamento de médicos com autenticação JWT'
        },
        servers: [
            {
                url: 'http://localhost:8081'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routers/api/medicoRoutes.js'], // Caminho para as rotas da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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

app.use('/api/medicos', medicoApiRoutes);
app.use(routes);

app.use(
  express.urlencoded({
  extended: true
  })
)

app.listen(8081, function(){
    console.log("Servidor no http://localhost:8081")
});