const Express = require("express");
const express = Express();
const porta = 8080;
const body_parser = require("body-parser");
const conexão = require("./database/conexão");
const Usuário = require("./database/Usuário");
const Adminstrador = require("./database/Adiministrador");

express.set("view engine", "ejs");
express.use(Express.static("public"));
express.use(body_parser.urlencoded({ extended: false }));
express.use(body_parser.json());

express.get("/", async (req, res) => {
  const usuarios = await Usuário.findAll();
  res.render("index.ejs", { usuarios: usuarios });
});

express.get("/admin", (req, res) => {
  res.render("login.ejs");
});

express.post("/admin/gerenciador", async (req, res) => {
  const { email, senha } = req.body;
  const admins = await Adminstrador.findAll();
  let validacao = false;

  admins.forEach((usuario) => {
    if (email === usuario.email && senha === usuario.senha) {
      validacao = true;
    }
  });

  if (validacao) {
    (async () => {
      const usuarios = await Usuário.findAll();
      res.render("indexAdm.ejs", { usuarios: usuarios });
    })();
  } else {
    res.redirect("/admin");
  }
});

express.post("/deletar",async (req,res)=>{
    const {id} = req.body;
    await Usuário.destroy({where:{id:id}});
    res.redirect("/");
});

express.post("/atualizar", async (req, res)=>{
    const {nome,sobrenome,endereco,estado,id} = req.body;
    await Usuário.update({nome:nome,sobrenome:sobrenome,endereco:endereco,estado:estado},{where:{id:id}})
    res.redirect("/")
});

express.post("/cadastrosalvo", async (req, res)=>{
  const {email,senha,nome,sobrenome,cpf,rg,nome_da_mae,nome_do_pai,nacionalidade,telefone,endereco} = req.body;
  await Adminstrador.create({
    nome: nome,
    sobrenome: sobrenome,
    telefone: telefone,
    nacionalidade: nacionalidade,
    cpf: cpf,
    rg: rg,
    endereco: endereco,
    nome_da_mae: nome_da_mae,
    nome_do_pai:nome_do_pai,
    email: email,
    senha: senha
  });
  res.redirect("/admin")
})

express.get("/cadastro", async (req, res)=>{
  res.render("cadastro.ejs")
})
express.post("/salvadados", async (req, res) => {
  const { nome, sobrenome, endereco, estado } = req.body;
  try {
    await Usuário.create({
      nome: nome,
      sobrenome: sobrenome,
      endereco: endereco,
      estado: estado,
    });
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao salvar no banco de dados:", error);
    res
      .status(500)
      .send("Erro interno do servidor ao salvar no banco de dados");
  }
});

express.get("/admin/atualizar/:id", (req, res) => {
  const { id } = req.params;
  Usuário.findByPk(id).then(atualizar => {
    res.render("atualizar.ejs", { atualizar: atualizar });
  });
});


express.listen(porta, (erro) =>
  erro ? console.log(erro) : console.log("Servidor rodando corretamente!")
);
