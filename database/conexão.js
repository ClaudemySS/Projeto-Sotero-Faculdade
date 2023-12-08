const Sequelize = require("sequelize");
const conexão = new Sequelize("projeto","root","root",{
    host: "localhost",
    dialect: "mysql"
});


(async ()=>{ await conexão.authenticate(), console.log("Conexão foi bem sucedida!")})();

module.exports = conexão;