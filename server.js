const express = require("express");
const app = express();

app.use(express.json());

const data = [
  { id: 1, nome: "Augusto César", curso: "Engenharia de Software"},
  { id: 2, nome: "Gustavo Henrique", curso: "Agropecuária"},
  { id: 3, nome: "Marília Gabriela", curso: "Música"},
];

// GET/BUSCAR
app.get("/students", function(req, res) {
  // endpoin sem barra no final

  res.json(data);
});

// POST/CRIAR
app.post("/students", function(req, res) {
  const { nome, curso } = req.body;

  data.unshift({ nome, curso });

  res.json({ nome, curso });
});

// PUT/ATUALIZAR
app.put("/students/:id", function(req, res) {
  const { id } = req.params;
  const student = data.find(stu => stu.id == id);

  if (!student) return res.status(204).json(); // código 204, não tem conteúdo

  const { nome } = req.body;

  student.nome = nome;

  res.json(student);
});

// DELETE/DELETAR
app.delete("/students/:id", function(req, res) {
  const { id } = req.params;

  // remove um estudante, ou seja, filtra
  const studentsFiltered = data.filter(stu => stu.id != id);

  res.json(studentsFiltered);
});

// servidor
app.listen(3000, function() {
  console.log("Server is running");
});
