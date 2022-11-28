import express from 'express'
import { Contenedor } from '../contenedor/containerFs.js'
const routeCart = express.Router()

const carts = new Contenedor('./src/db/cart.txt')

routeCart.get('/', async (req, res) => {
    const listCarts = await carts.getAll()
    res.json(listCarts)
})

routeCart.delete('/:id', (req, res) => {
  
})

routeCart.get('/:id/products', (req, res) => {
  
})

routeCart.post('/:id/products', (req, res) => {
  
})

routeCart.delete('/:id/products/:id_prod', (req, res) => {
  
})

export { routeCart }