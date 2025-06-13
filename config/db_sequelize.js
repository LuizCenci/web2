const Sequelize = require('sequelize');
const sequelize = new Sequelize('web2_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port:5432
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.especialidade = require('../models/relational/especialidade.js')(sequelize, Sequelize);
db.medico = require('../models/relational/medico.js')(sequelize, Sequelize);
db.especialidade.hasMany(db.medico, {foreignKey:'id_especialidade', onDelete: 'No ACTION'});
db.medico.belongsTo(db.especialidade, {foreignKey:'id_especialidade'});
module.exports = db;

