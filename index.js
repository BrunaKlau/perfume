const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let perfumes = [];
let idCounter = 1;

// Rota para listar todos perfumes
app.get('/perfumes', (req, res) => {
  res.json(perfumes);
});

// Rota para cadastrar um perfume
app.post('/perfumes', (req, res) => {
  const perfume = { id: idCounter++, ...req.body };
  perfumes.push(perfume);
  res.status(201).json(perfume);
});

// Rota para atualizar um perfume pelo ID
app.put('/perfumes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = perfumes.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Perfume não encontrado' });
  }
  perfumes[index] = { id, ...req.body };
  res.json(perfumes[index]);
});

// Rota para deletar um perfume pelo ID
app.delete('/perfumes/:id', (req, res) => {
  const id = Number(req.params.id);
  perfumes = perfumes.filter(p => p.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
