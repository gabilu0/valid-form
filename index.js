const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

const port = 3000

app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser('wwwlokoabreu'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash())



app.get('/', (request, response) => {
    const emailError = request.flash('emailError')
    const nameError = request.flash('nameError')
    const pointsError = request.flash('pointsError')

    const email = request.flash('email')

    response.render('index', {email, emailError, nameError, pointsError })
})

app.post('/form', (request, response) => {
    const { email, name, points } = request.body

    let emailError
    let nameError
    let pointsError
  
    if (email === undefined || email === '') {
        emailError =  'O campo de e-mail é obrigatório'
    }
  
    if (points < 10) {
        pointsError = 'Os pontos devem ser no mínimo 10'
    }
  
    if (name === undefined || name === '' || name.length < 4) {
        nameError = 'O nome deve ter no mínimo 4 caracteres'
    }
  
    if (nameError != undefined || pointsError != undefined || emailError != undefined) {
      request.flash('emailError', emailError) 
      request.flash('nameError', nameError) 
      request.flash('pointsError', pointsError) 
      request.flash('email', email)
      response.redirect('/');// Redirecionar para outra rota
    } else {
      // Lógica para processar os dados quando todas as validações passarem
      response.send('Tudo certo')
    }
  });
  



app.listen(port, () => console.log(`Example app listening on port ${port}!`))