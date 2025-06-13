const express = require('express');
const db = require('../config/db_sequelize');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerEspecialidade = require('../controllers/controllerEspecialidade');
const controllerMedico = require('../controllers/controllerMedico');
const middlewares = require('../middlewares/middlewares');

const route = express.Router();

// db.sequelize.sync({force: true}).then(() => {
//     console.log('{ force: true }');
// });
// db.Usuario.create({login:'admin', senha:'1234', tipo:1});


module.exports = route;

//Home
route.get("/home", function (req, res) {
    if (req.session.login){
        res.render('home')
    }else{
        res.redirect('/api/medicos/login')
    } 
});

//Controller Usuario
// route.get("/", controllerUsuario.getLogin);
// route.post("/login", controllerUsuario.postLogin);
route.get("/usuarioCreate", middlewares.onlyAdmin, controllerUsuario.getCreate, );
route.post("/usuarioCreate", middlewares.onlyAdmin, controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/usuarioUpdate/:id", middlewares.onlyAdmin, controllerUsuario.getUpdate);
route.post("/usuarioUpdate", middlewares.onlyAdmin, controllerUsuario.postUpdate);
route.get("/usuarioDelete/:id", middlewares.onlyAdmin, controllerUsuario.getDelete);
route.get ("/logout", controllerUsuario.getLogout);

//Controller especialidade
route.get("/especialidadeCreate", middlewares.onlyAdmin, controllerEspecialidade.getCreate);
route.post("/especialidadeCreate", middlewares.onlyAdmin, controllerEspecialidade.postCreate);
route.get("/especialidadeList", controllerEspecialidade.getList);
route.get("/especialidadeUpdate/:id_especialidade", middlewares.onlyAdmin, controllerEspecialidade.getUpdate);
route.post("/especialidadeUpdate", middlewares.onlyAdmin, controllerEspecialidade.postUpdate);
route.get("/especialidadeDelete/:id_especialidade", middlewares.onlyAdmin, controllerEspecialidade.getDelete);

//Controller medico
// route.get("/medicoCreate", middlewares.onlyAdmin, controllerMedico.getCreate);
// route.post("/medicoCreate", middlewares.onlyAdmin, controllerMedico.postCreate);
// route.get("/medicoList", controllerMedico.getList);
// route.get("/medicoUpdate/:id_medico", middlewares.onlyAdmin, controllerMedico.getUpdate);
// route.post("/medicoUpdate/", middlewares.onlyAdmin, controllerMedico.postUpdate);
// route.get("/medicoDelete/:id_medico", middlewares.onlyAdmin, controllerMedico.getDelete);


module.exports = route;