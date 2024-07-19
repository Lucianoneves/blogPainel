const { render } = require("ejs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController");
const articlesController= require("./articles/articlesController");
const usersController = require("./users/usersController");

const Article =require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

// view engine
app.set('view engine', 'ejs');


//session//

app.use(session({
    secret: "feiodfskjdhsokjfhjiabsdfibasdfyvbsadhy", cookie:{maxAge: 30000}
}))


// Static 
app.use(express.static('public'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database

connection
.authenticate()
.then(() =>{
    console.log("Conexão  feita com sucesso!")
}).catch((error) =>{
    console.log("error");
})


app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/",usersController);





app.get("/", (req, res) =>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render("index",{articles: articles, categories: categories})
        });
       
    });
})  

app.get("/:slug", (req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article",{article: article, categories: categories})
            });
        }else{
            res.redirect("/");
            }
        
    }).catch(err =>{
        res.redirect("/");
    });
});

app.get("/category/:slug",(req,res) => {  
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        },
        include:[{model: Article}]
    }).then(Category =>{
        if(Category!= undefined){

            Category.findAll().then(categories =>{
                res.render("index",{articles: Category.articles,categories: categories});
            });

        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/")
    })
})


app.listen(9000,() =>{
    console.log("O servidor esta rodando")
})
