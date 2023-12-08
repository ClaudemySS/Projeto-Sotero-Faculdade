const Sequelize = require("sequelize");
const conexão = require("./conexão");

const Usuário = conexão.define("usuarios", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Usuário.sync({force: false});

module.exports = Usuário;
