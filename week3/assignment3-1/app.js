const path = require('path');

const express = require('express');
const app = express();
const hbs = require('hbs');
const helmet = require('helmet');

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));
app.use(helmet());

//SET THE VIEW ENGINE -- SET!!!!! NOT USE!!!!!
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.all('/', (req, res, next)=>{
    hbs.registerHelper('tableContent', (context, options) =>{      
        let out = "";
        var amt = req.body.amount == null ? 3 : req.body.amount;
        
        for(let i = 0; i < amt; i++){
            out += "<tr>"
            for(let x = 0; x < amt; x++){
                let color = ((1<<24)*Math.random()|0).toString(16);
                out += `<td style='background-color: #${color}; text-align: center;'><span style='color: white;'>#${color}</span><br>#${color}</td>`;
            }
            out += "</tr>"
        }
        return out;
    });
    res.render('index');
});
app.listen(3000);
