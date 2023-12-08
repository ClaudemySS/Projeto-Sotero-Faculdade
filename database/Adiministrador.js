const Sequelize = require("sequelize");
const conexão = require("./conexão");

const Administrador = conexão.define("administrador", {
  nome:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  sobrenome:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  telefone:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  nacionalidade:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cpf:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rg:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  endereco:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  nome_da_mae:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  nome_do_pai:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  senha: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

Administrador.sync({force: false});

module.exports = Administrador;
