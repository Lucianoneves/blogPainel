const Sequelize = require("sequelize");

const connection = new Sequelize('blogPainel', 'root', '2287',{
 host:'localhost',
 dialect: 'mysql',
 timezone: "-03:00",
});

module.exports = connection;