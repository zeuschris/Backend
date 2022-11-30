import express from 'express'
const app = express()

// Routes
import { routeProducts } from './src/routes/products.js'
import { routeCart } from './src/routes/cart.js'
import { Contenedor } from './src/contenedor/ContainerSql.js'
import { options } from './src/connection/options.js'

const port = process.env.port || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', routeProducts)
app.use('/api/cart', routeCart)

app.use((req,res,next) => {
  if (!req.route){
    res.status(404).send({error: -2, description: `the route ${req.url} was not found`})
  }else{
    next()
  }
})

const servidor = app.listen(port, () => {
  console.log(`Server on port: ${port} listening...`)
})

servidor.on('error', error => console.log(`Error: ${error}`))
