// Import modules
import express from 'express'
import { Contenedor } from '../contenedor/containerFs.js'

// Route
const routeProducts = express.Router()

const products = new Contenedor('./src/db/products.txt')

// Admin 
const staff = (req,res,next) => {
    let adm = req.headers.adm
    if ( adm === true ) {
        next()
    }else{
        res.status(401).send({error : -1, description: `rute ${req.url} is not autorized`})
    }
}

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

routeProducts.post('/', staff, async (req, res) => {
  let product = await products.save()
  res.json(product)
})

routeProducts.put('/:id', staff, async (req, res) => {
  let id = req.params.id
  let product = await products.update(id)
  res.json(product)
})

routeProducts.delete('/:id', staff, async (req, res) => {
  let id = req.params.id
  let product = await products.deleteById(id)
})

export { routeProducts }