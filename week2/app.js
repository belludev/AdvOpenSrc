const express = require('express');
const app = express();
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('today', () => {
    var date = new Date();
    return date;
});
app.set('view engine', 'hbs');
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('index.hbs', {
        title: 'WebsiteBB',
        name: 'Andrew'
    });
});
app.use('/', (req, res, next) => {
    console.log(new Date());
    next();
});
app.get('/form', (req, res)=>{
    res.render('form.hbs');
});
app.all('/banana', (req,res) => {
    res.render('banana.hbs', {
        name: req.body.firstName,
        santa: req.query.present
    })
})

app.get('/banana', (req, res)=>{
    res.render('banana.hbs');
});

app.listen(3000, () => {
    console.log('Server up and running on port 3000')
});