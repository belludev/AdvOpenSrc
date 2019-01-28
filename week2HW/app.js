//Native
const path = require('path');

//3rd Party
const express = require('express');
const app = express();
const helmet = require('helmet');
const hbs = require('hbs');

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.get('/', (req, res, next)=>{
    res.render('index',{
        pageTitle: "Home"
    })
});
app.get('/about', (req, res, next)=>{
    res.render('about',{
        pageTitle: "About"
    })
});
app.get('/form', (req, res, next) => {
    res.render('form',{
        pageTitle: "Form"
    })
});
app.post('/form_submit', (req, res, next) =>{
    res.render('formSubmit',{
        name: req.body.name,
        email: req.body.email,
        comments: req.body.comments
    })
})
app.listen(3000);