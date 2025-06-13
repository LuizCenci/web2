module.exports = (sequelize, Sequelize) => {
    const especialidade = sequelize.define('especialidade', {
        id_especialidade: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        nome_especialidade: {
            type: Sequelize.STRING, allowNull: false
        }
    });
    return especialidade;
}