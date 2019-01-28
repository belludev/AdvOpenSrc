const path = require('path');

const express = require('express');
const app = express();
const helmet = require('helmet');
const hbs = require('hbs');

app.use(express.static('public'))
app.use(helmet());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

function helper404(){
    hbs.registerHelper('error404',()=>{
        let out = "";
        let classes = ['still', 'rotate', 'shrink'];
        let rand = Math.floor(Math.random() * 50) + 20;
        for(var i = 0; i < rand; i++){
            let randClass = classes[Math.floor(Math.random() * 3)];
            out += `<div class='${randClass}'>404</div>`;
        }
        return out;
    });
}
app.get('/', (req, res, next) => {
    helper404();
    res.render('404');
})
app.listen(3000);