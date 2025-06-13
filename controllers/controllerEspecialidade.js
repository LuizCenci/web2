const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getCreate(req, res) {
        res.render('especialidade/especialidadeCreate');
    },
    async postCreate(req, res) {
        db.especialidade.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },
    async getList(req, res) {
        db.especialidade.findAll().then(especialidades => {
            res.render('especialidade/especialidadeList', { especialidades: especialidades.map(especialidade => especialidade.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.especialidade.findByPk(req.params.id_especialidade).then(
            especialidade => res.render('especialidade/especialidadeUpdate', { especialidade: especialidade.dataValues })
        ).catch(function (err) {
            console.log(err);
        });
    },
    async postUpdate(req, res) {
        await db.especialidade.update(req.body, { where: { id_especialidade: req.body.id_especialidade } }).then(
            res.render('home')
        ).catch(function (err) {
            console.log(err);
        });
    },
    async getDelete(req, res) {
        await db.especialidade.destroy({ where: { id_especialidade: req.params.id_especialidade } }).then(
            res.render('home')
        ).catch(err => {
            console.log(err);
        });
    }

}