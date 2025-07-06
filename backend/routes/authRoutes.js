const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Usuário fixo para exemplo
const user = { email: 'admin@admin.com', senha: bcrypt.hashSync('123456', 10) };

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (email !== user.email || !bcrypt.compareSync(senha, user.senha)) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;