const express = require('express')
const server = express()
const port = 3000
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const { body, validationResult } = require('express-validator');

//ตั้งค่าsessionสำหรับระบบ
server.use(expressSession({
    secret: 'ttvone.com',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))

  server.get('/s',(req,res)=>{
    req.session.item='Hello World';
    res.end('set session');
  })

// parse application/x-www-form-urlencoded ตั้งค่าการparseตัวแปรเมื่อclentส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())
server.post('/',(req,res)=>res.json(req.body));

server.post("/",[
    // check('firtname').not().isEmpty()
   
],(req,res)=>{
    try{
      validationResult(req).throw
      res.json(req.body)
    }catch(ex){
        res.status(400).json(ex)

    }
    res.json(req.body)
})




server.get('*',(req,res)=>{
    res.end(`<h1>backend server to start session is ${req.session.item}</h1>`);
} )

server.listen(port, () => console.log(`Example app listening on port ${port}!`))