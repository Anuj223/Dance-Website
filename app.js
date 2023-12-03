
const express = require("express");
const path = require('path');
const { log } = require('console');
const app =express();
const bodyparser = require('body-parser')
const port = 80;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
        mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
var ContactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String,
});
var Contact = mongoose.model('Contact', ContactSchema);

// app.use(express.static('static',option))
app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
        const params={};
        res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
        const params={};
        res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
        var myData=new Contact(req.body);
        myData.save().then(()=>{
                res.send("The given data has been saved")
        }).catch(()=>{
                res.status(400).send("The given data has not been saved")
        });

        // res.status(200).render('contact.pug',params)
})

app.listen(port,()=>{
        console.log(`The application is started at port ${port}`);
});

