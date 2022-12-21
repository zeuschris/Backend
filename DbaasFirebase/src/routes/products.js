// Import modules and Router
import express from 'express'
import { products } from '../daos/index.js';
const routeProducts = express.Router()

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
    const id = parseInt(req.params.id)
    let product = await products.getById(id)
    res.json(product)
})

routeProducts.post('/', staff, async (req, res) => {
  let product = req.body
  let newProduct = await products.save(product)
  res.json(newProduct)
})

routeProducts.put('/:id', staff, async (req, res) => {
  const id = parseInt(req.params.id)
  const product = req.body;
  await products.update(id, product);
  res.json(product)
})

routeProducts.delete('/:id', staff, async (req, res) => {
  const id = parseInt(req.params.id)
  let product = await products.deleteById(id)
  res.send(`The product with id ${id} was remove.`)
})

export { routeProducts }