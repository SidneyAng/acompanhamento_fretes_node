const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Sidney',           // Substitua pelo seu usuário do banco de dados
  password: '011726',   // Substitua pela sua senha do banco de dados
  database: 'acompanhamento_fretes'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Rota para adicionar um novo frete
app.post('/add', (req, res) => {
  const { cidade_origem, cidade_destino, placa_caminhao, data } = req.body;
  const query = 'INSERT INTO fretes (cidade_origem, cidade_destino, placa_caminhao, data) VALUES (?, ?, ?, ?)';
  db.query(query, [cidade_origem, cidade_destino, placa_caminhao, data], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect('/');
    }
  });
});

// API para obter todos os fretes
app.get('/api/fretes', (req, res) => {
  db.query('SELECT * FROM fretes', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// API para obter um frete específico pelo ID
app.get('/api/fretes/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM fretes WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).json({ error: "Frete não encontrado" });
    } else {
      res.json(result[0]);
    }
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
