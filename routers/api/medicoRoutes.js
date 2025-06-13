const express = require('express');
const controllerMedico = require('../../controllers/controllerMedico');
const authenticateToken = require('../../middlewares/authenticateToken');
const authController = require('../../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gerenciamento de médicos
 */

/**
 * @swagger
 * /api/medicos:
 *   get:
 *     summary: Lista todos os médicos
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos obtida com sucesso
 */
router.get('/', authenticateToken, controllerMedico.getMedicos);

/**
 * @swagger
 * /api/medicos:
 *   post:
 *     summary: Cria um novo médico
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               id_especialidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 */
router.post('/', authenticateToken, controllerMedico.postMedico);

/**
 * @swagger
 * /api/medicos/{id}:
 *   get:
 *     summary: Busca um médico pelo ID
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 */
router.get('/:id', authenticateToken, controllerMedico.getMedico);

/**
 * @swagger
 * /api/medicos/{id}:
 *   put:
 *     summary: Atualiza um médico pelo ID
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               id_especialidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       404:
 *         description: Médico não encontrado
 */
router.put('/:id', authenticateToken, controllerMedico.putMedico);

/**
 * @swagger
 * /api/medicos/{id}:
 *   delete:
 *     summary: Remove um médico pelo ID
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico removido com sucesso
 *       404:
 *         description: Médico não encontrado
 */
router.delete('/:id', authenticateToken, controllerMedico.deleteMedico);

/**
 * @swagger
 * /api/medicos/login:
 *   post:
 *     summary: Login do usuário e geração do token
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authController.login);

module.exports = router;
