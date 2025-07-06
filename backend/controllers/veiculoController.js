const db = require('../models/db');

exports.listar = async (req, res) => {
    const result = await db.query('SELECT * FROM veiculos ORDER BY nome ASC');
    res.json(result.rows);
};

exports.criar = async (req, res) => {
    const { nome, placa } = req.body;
    const result = await db.query(
        'INSERT INTO veiculos (nome, placa, status) VALUES ($1, $2, $3) RETURNING *',
        [nome, placa, 'ativo']
    );
    res.status(201).json(result.rows[0]);
};

exports.editar = async (req, res) => {
    const { nome, placa } = req.body;
    const { id } = req.params;
    const result = await db.query(
        'UPDATE veiculos SET nome = $1, placa = $2 WHERE id = $3 RETURNING *',
        [nome, placa, id]
    );
    res.json(result.rows[0]);
};

exports.arquivar = async (req, res) => {
    const { id } = req.params;
    await db.query('UPDATE veiculos SET status = $1 WHERE id = $2', ['inativo', id]);
    res.json({ message: 'Veículo arquivado' });
};

exports.desarquivar = async (req, res) => {
    const { id } = req.params;
    await db.query('UPDATE veiculos SET status = $1 WHERE id = $2', ['ativo', id]);
    res.json({ message: 'Veículo desarquivado' });
};

exports.deletar = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM veiculos WHERE id = $1', [id]);
    res.json({ message: 'Veículo removido' });
};
