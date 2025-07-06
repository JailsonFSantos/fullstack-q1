const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

router.get('/', veiculoController.listar);
router.post('/', veiculoController.criar);
router.put('/:id', veiculoController.editar);
router.patch('/:id/arquivar', veiculoController.arquivar);
router.patch('/:id/desarquivar', veiculoController.desarquivar);
router.delete('/:id', veiculoController.deletar);

module.exports = router;