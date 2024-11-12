const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão com o banco de dados utilizando a URL completa do Heroku
const db = mysql.createConnection(process.env.JAWSDB_URL);

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida');
});

// Rota de exemplo
app.get('/fretes', (req, res) => {
    const query = 'SELECT * FROM fretes'; // Substitua pela sua consulta SQL
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro na consulta ao banco de dados' });
            return;
        }
        res.json(result);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
