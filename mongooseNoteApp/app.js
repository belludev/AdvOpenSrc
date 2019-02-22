//3rd party
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const hbs = require('hbs');

//Mongoose connection
mongoose.connect('mongodb://localhost:27017/Empl', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', ()=> {
    console.log('Connection Made');
});
const Employee = require('./schema/employee.js');

//Middleware
app.use(express.static(__dirname + 'public'));
app.set('view engine', 'hbs');
app.use(helmet());
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({extended: false}));

//Route
app.get('/', (req, res, next) => {

    var emps = Employee.find({}, (err, data)=>{
        if(err) console.log(err)
        else{
            
            console.log(data);
            let responseType = "";
            if(req.query.delete == "success"){
                responseType = "<h2>Item Deleted</h2>";
            }
            res.render('index',{
                employees: data,
                response: responseType,
                showTable: true
            });
        }
    });

    
})
app.post('/', (req, res, next) => {
    new Employee({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dapartment: req.body.dapartment,
        startDate: req.body.startDate,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary
    }).save((err) => {
        if(err) console.log(err);
        else console.log('Inserted')
    })
    res.redirect('/');
})

app.get('/delete/:id', (req, res, next) =>{
    Employee.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            console.log(err);
            res.redirect('/?delete=failed');
        }
        else console.log('Deleted')
    })
    res.redirect('/?delete=success')
    // res.send(req.params)
})

app.get('/:id', (req, res, next) => {
    Employee.findById(req.params.id, (err, employee) => {
        if(err){
            console.log(err);
            res.redirect('/index')
        }else{
            console.log(employee)
            res.render('index', {
                employee,
                showTable: false,
                isEdit: true
            });
        }
    })
})
app.post('/modify', (req, res, next) => {

    Employee.findByIdAndUpdate(
        req.body.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
        },
        {new: true},
        (err, model)=>{
            if (err) return res.status(500).send(err);
        }
    );
    res.redirect('/?update=success')
})

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});