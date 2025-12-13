const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rota inicial (rota padrão)
app.get('/', (req, res) => {
  res.send('API está rodando ✨');
});

// exemplo de rota /api
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello Pedro e Dduaaa! Backend está oon 🔥' });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
