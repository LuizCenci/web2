const db = require('../config/db_sequelize');

module.exports = {

    // GET /api/medicos
    async getMedicos(req, res) {
        try {
            const medicos = await db.medico.findAll({
                include: {
                    model: db.especialidade,
                    attributes: ['nome_especialidade']
                }
            });
            res.json(medicos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar médicos.' });
        }
    },

    // GET /api/medicos/:id
    async getMedico(req, res) {
        try {
            const medico = await db.medico.findByPk(req.params.id, {
                include: {
                    model: db.especialidade,
                    attributes: ['nome_especialidade']
                }
            });

            if (medico) {
                res.json(medico);
            } else {
                res.status(404).json({ error: 'Médico não encontrado.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar médico.' });
        }
    },

    // POST /api/medicos
    async postMedico(req, res) {
        try {
            const medico = await db.medico.create(req.body);
            res.status(201).json(medico);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar médico.' });
        }
    },

    // PUT /api/medicos/:id
    async putMedico(req, res) {
        try {
            const medico = await db.medico.findByPk(req.params.id);

            if (medico) {
                await medico.update(req.body);
                res.json(medico);
            } else {
                res.status(404).json({ error: 'Médico não encontrado.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar médico.' });
        }
    },

    // DELETE /api/medicos/:id
    async deleteMedico(req, res) {
        try {
            const medico = await db.medico.findByPk(req.params.id);

            if (medico) {
                await medico.destroy();
                res.json({ message: 'Médico excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Médico não encontrado.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao excluir médico.' });
        }
    }
};
