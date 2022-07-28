const express = require ('express')
const session= require ('express-session')

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', '/views')
app.set('view engine', 'ejs')

app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost/sessions'
    }),
    secret: "conrad",
    resave: false,
    saveUninitialized: false

}))

app.get('/login', (req,res)=>{
    if (req.session.username) return res.redirect('/')

    res.sendFile(__dirname + '/views/login.html')
})

app.post('/login', (req,res)=>{
    req.session.username= req.body.username 
    return res.redirect('/')
})

app.get('/', (req,res)=>{
    if  (!req.session.username) return res.redirect('/login')

    return res.render('index', {username: req.session.username})
})

app.get('/logout', (req,res)=>{
    username= req.session.username
    req.session.destroy()

    return res.render('logout', {username: req.session.username})
})


app.listen(8080,()=> console.log('server running...'))