// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('web2_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const Usuario = require('./relational/usuario')(sequelize, Sequelize);
const especialidade = require('./relational/especialidade')(sequelize, Sequelize);
const medico = require('./relational/medico')(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar:', err);
  });

module.exports = { sequelize, Usuario, especialidade, medico };
