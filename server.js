const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(morgan('dev'))

//Built-in middleware
app.use(express.static('public'))

//Application level middleware
app.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

app.get('/', (req, res) => {
  res.status(200)
  const mahasiswa = [
    {
      nama: 'Asep',
      email: 'asep@gmail.com',
    },

    {
      nama: 'Usro',
      email: 'usro@gmail.com',
    },
  ]

  res.render('index', {
    nama: 'Anissa Tri Lahitani',
    title: 'Halaman Index',
    layout: 'layouts/main-layout',
    mahasiswa: mahasiswa,
  })
  // res.sendFile('./index.html',{root: __dirname})
})

app.get('/about', (req, res) => {
  res.status(200)
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  })
  // res.sendFile('./about.html',{root: __dirname})
})

app.get('/contact', (req, res) => {
  res.status(200)
  const contacts = loadContact()
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
  })
  // res.sendFile('./contact.html',{root: __dirname})
})

app.get('/contact/:nama', (req, res) => {
  res.status(200)
  const contact = findContact(req.params.nama)
  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail',
    contact,
  })
  // res.sendFile('./contact.html',{root: __dirname})
})

app.get('/product/:id', (req, res) => {
  res.send(`Product ID: ${req.params.id} and Label Product: ${req.query.label}`)
})

app.get('/product/:id/category/:idCat', (req, res) => {
  res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
