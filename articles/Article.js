const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");


const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNUll: false
    },slug: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNUll: false
    }
})

Category.hasMany(Article); // Uma categoria tem muitos artigos    1 para muitos 
Article.belongsTo(Category);   // Relacionamneto entre modules  uma Artigo  pertence a uma Categoria 1 para 1

//Article.sync({force: true});//

module.exports = Article;