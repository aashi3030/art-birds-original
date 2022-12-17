const express = require('express');
const mysql = require("mysql")
const path = require("path")
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDir = path.join(__dirname, './public')
app.use(express.static('publicimages'));

app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.set('view engine', 'hbs')

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})


app.get("/",(req,res) =>
{
    res.render("index2")
})
app.get("/Sign-Up", (req, res) => {
    res.render("Sign-up")
})

app.get("/login", (req, res) => {
    res.render("login")
})



app.get('/options',(req,res)=>
{
    res.render('options');
})

app.get('/originals',(req,res)=>
{
    res.render('original');
})


app.get('/paintings',(req,res)=>
{
    res.render('paintings');
})

app.get('/potraits',(req,res)=>
{
    res.render('potraits');
})


app.get('/sculptors',(req,res)=>
{
    res.render('sculptors');
})


app.get('/fine-arts',(req,res)=>
{
    res.render('fine-arts');
})


app.post("/login", (req, res) => {    
    const { name, email, password, password_confirm, images } = req.body

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }

        if( result.length > 0 ) {
            return res.render('login', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return res.render('login', {
                message: 'This password is already in use'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        console.log(hashedPassword)
       
        db.query('INSERT INTO user SET?', {name: name, email: email, password: hashedPassword, images: images}, (err, result) => {
            if(error) {
                console.log(error)
            } else {
                return res.render('thank', {
                    message: 'Your order would be deliverd soon!!!'
                })
            }
        })        
    })
})















app.post("/Sign-up", (req, res) => {    
    const { name, email, password, password_confirm } = req.body

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }

        if( result.length > 0 ) {
            return res.render('Sign-up', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return res.render('Sign-up', {
                message: 'This password is already in use'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        console.log(hashedPassword)
       
        db.query('INSERT INTO user SET?', {name: name, email: email, password: hashedPassword}, (err, result) => {
            if(error) {
                console.log(error)
            } else {
                return res.render('options', {
                    message: 'User registered!'
                })
            }
        })        
    })
})


app.post("/originals_submit", (req, res) => {    
    const { name, email, password, password_confirm,images } = req.body

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }

        if( result.length > 0 ) {
            return res.render('Originals', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return res.render('Originals', {
                message: 'This password is already in use'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        console.log(hashedPassword)
       
        db.query('INSERT INTO user SET?', {name: name, email: email, password: hashedPassword,images: images}, (err, result) => {
            if(error) {
                console.log(error)
            } else {
                return res.render('Originals', {
                    message: 'sucessful'
                })
            }
        })        
    })
})

// app.post('/originals_submit', (req, res) => {
//     const {email, images} = req.body;
//     db.query('SELECT * FROM user WHERE email = ?', [req.params.email], (err, rows) => {
//         if (!err) {
//             res.send(rows)
//             db.query('INSERT INTO user SET ? where email = email',  images, (err, rows) => {
     
//             if (!err) {
//                 res.send(`Beer with the record ID  has been added.`)
//             } else {
//                 console.log(err)
//             }
            
//             console.log('The data from beer table are:11 \n', images)
    
//             })

//         } else {
//             console.log(err)
//         }
        
      
//     })
        
//     })
// ;











app.listen(5000, ()=> {
    console.log("server started on port 5000")
})