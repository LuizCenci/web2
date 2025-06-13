const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getCreate(req, res) {
        const especialidadesRaw = await db.especialidade.findAll();
        const especialidades = especialidadesRaw.map(e => e.get({ plain: true }));
        res.render('medico/medicoCreate', {especialidades});
    },
    async postCreate(req, res) {
        db.medico.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },
    async getList(req, res) {
        db.medico.findAll({
            include:{
                model: db.especialidade,
                attributes: ['nome_especialidade']
            }
        }).then(medicos => {
            res.render('medico/medicoList', { medicos: medicos.map(medico => medico.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        const especialidadesRaw = await db.especialidade.findAll();
        const especialidades = especialidadesRaw.map(e => e.get({ plain: true }));
        await db.medico.findByPk(req.params.id_medico).then(
            medico => res.render('medico/medicoUpdate', { 
                medico: medico.dataValues,
                especialidades
             })
        ).catch(function (err) {
            console.log(err);
        });
    },
    async postUpdate(req, res) {
        await db.medico.update(req.body, { where: { id_medico: req.body.id_medico } }).then(
            res.render('home')
        ).catch(function (err) {
            console.log(err);
        });
    },
    async getDelete(req, res) {
        await db.medico.destroy({ where: { id_medico: req.params.id_medico } }).then(
            res.render('home')
        ).catch(err => {
            console.log(err);
        });
    }

}