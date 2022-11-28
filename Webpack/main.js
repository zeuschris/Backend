import express from 'express'
const app = express()

// Routes
import { routeProducts } from './src/routes/products.js'
import { routeCart } from './src/routes/cart.js'

const port = process.env.port || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', routeProducts)
app.use('/api/cart', routeCart)


const servidor = app.listen(port, () => {
  console.log(`Servidor escuchando: ${port}`)
})

servidor.on('error', error => console.log(`Error: ${error}`))
