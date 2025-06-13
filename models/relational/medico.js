module.exports = (sequelize, Sequelize) => {
    const medico = sequelize.define('medico', {
        id_medico: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        nome_medico: {
            type: Sequelize.STRING, allowNull: false
        },
        crm: {
            type: Sequelize.STRING, allowNull: false
        },
        telefone: {
            type: Sequelize.STRING, allowNull: false
        }
    });
    return medico;
}