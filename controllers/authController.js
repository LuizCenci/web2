const db = require('../config/db_sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');   
const usuario = require('../models/relational/usuario');
const secret = 'secret';

module.exports = {
    async login(req, res) {
        const { login, senha } = req.body;

        try {
            const usuario = await db.usuario.findOne({ where: { login } });

            if (!usuario) {
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            }

            const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.status(401).json({ error: 'Senha inválida.' });
            }

            const token = generateToken(usuario);

            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    },

};

function generateToken(usuario){
    const payload = {
        id: usuario.id,
        login: usuario.login,
    }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
};
