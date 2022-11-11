const express = require('express')
const app = express()
const PORT = 8080

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const products = []

app.get('/products', (req,res) => {
    res.render('list', {
        products
    })
})

app.post('/products', (req,res) => {
    const product = req.body
    products.push(product)
    res.render('form', {})
})

app.get('/', (req,res) => {
    res.render('form', {})
})


const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}...`)
})

server.on('error', error => console.log(`An error has occurred: ${error}`))