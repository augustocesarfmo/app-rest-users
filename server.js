const express = require("express");
const app = express();

app.use(express.json());

const data = [
  { id: 1, nome: "Augusto César"},
  { id: 2, nome: "Gustavo Henrique"},
  { id: 3, nome: "Marília Gabriela"},
];

// GET/BUSCAR
app.get("/users", function(req, res) {
  // endpoints no plural e sem barra no final

  res.json(data);
});

// POST/CRIAR
app.post("/users", function(req, res) {
  const { nome } = req.body;

  data.unshift({ nome }); // adiciona um elemento no topo da lista

  res.json({ nome });
});

// PUT/ATUALIZAR
app.put("/users/:id", function(req, res) {
  const { id } = req.params;
  const user = data.find(stu => stu.id == id);

  if (!user) return res.status(204).json(); // código 204, não tem conteúdo

  const { nome } = req.body;

  user.nome = nome;

  res.json(user);
});

// DELETE/DELETAR
app.delete("/users/:id", function(req, res) {
  const { id } = req.params;

  // remove um estudante
  const studentsFiltered = data.filter(stu => stu.id != id);

  res.json(studentsFiltered);
});

// servidor
app.listen(3000, function() {
  console.log("Server is running");
});
