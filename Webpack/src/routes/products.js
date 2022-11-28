// Import modules
import express from 'express'
import { Contenedor } from '../contenedor/containerFs.js'

// Route
const routeProducts = express.Router()

const products = new Contenedor('./src/db/products.txt')


// Endpoints
routeProducts.get('/', async (req, res) => {
    const list = await products.getAll()
    res.json(list)
})

routeProducts.get('/:id', async (req, res) => {
    let id = req.params.id
    let product = await products.getById(id)
    res.json(product)
})

routeProducts.post('/', async (req, res) => {
  let product = await products.save()
  res.json(product)
})

routeProducts.put('/:id', async (req, res) => {
  let id = req.params.id
  let product = await products.update(id)
  res.json(product)
})

routeProducts.delete('/:id', async (req, res) => {
  let id = req.params.id
  let product = await products.deleteById(id)
})

export { routeProducts }