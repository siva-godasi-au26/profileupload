const express = require('express');
const app = express();
const ejs = require('ejs');
const multer = require('multer');

const {authuser} = require('./routes/authuser.js')
const upload = multer({ storage: multer.memoryStorage() })

const session = require('express-session')
app.use(session({
    secret: 'sivaabcdhffrfgdff',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge : 1000 * 60 * 60 * 72 },
    name:'session-id' 
  }))

const {Base64} = require('js-base64');

const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'sivagodasi', 
    api_key: '912254393666218', 
    api_secret: 'qScwmzuHdZ-uuqL5VraPEQ_hQA0',
  });

const userdata = require('./userdata/users.json');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/signup',(req,res)=>{
    res.render('signup')
});

app.get('/login',(req,res)=>{
    res.render('login')
});

const dbemail = 'siva@gmail.com'
const dbpassword = 'siva'

app.post('/signup',upload.single('Avatarimage'),(req,res)=>{
    const {email,password} = req.body
    if(email === dbemail && password === dbpassword){
        req.session.emailID = email
        req.session.isLogged = true
        const signupdata = req.body
        // console.log(signupdata)
        const filedata = req.file
        // console.log(filedata)
        const encodeddata = Base64.encode(filedata.buffer)
        if(filedata){
            cloudinary.uploader.upload(`data:${filedata.mimetype};base64,${encodeddata}`,function(error,result){
                // console.log(result)
                signupdata.imageUrl = result.secure_url             
                userdata.push(signupdata)
                // console.log(userdata)
                res.redirect('/profile')
            });        
    }
    }else{
        res.send('invalid username & password')
    }
})
app.get('/userinfo',authuser,(req,res)=>{
    res.send(userdata)
})

app.get('/profile',authuser,(req,res)=>{
    res.render('profile')
});

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.send('logout')
})

app.post('/login',authuser,(req,res)=>{
    const {email,password} = req.body
    if(email === dbemail && password === dbpassword){
        res.render('profile')
    }else{
        res.send('signup before login')
    }
})
const PORT = process.env.PORT || 2022
app.listen(PORT)

