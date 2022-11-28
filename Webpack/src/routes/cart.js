import express from 'express'
import { Contenedor } from '../contenedor/containerFs.js'
const routeCart = express.Router()

const carts = new Contenedor('./src/db/cart.txt')

routeCart.get('/', async (req, res) => {
    const listCarts = await carts.getAll()
    res.json(listCarts)
})

routeCart.delete('/:id', async (req, res) => {
    const idCart = parseInt(req.params.id)
    await carts.deleteById(idCart)
    res.json({
      status: 'ok'
    })
})

routeCart.get('/:id/products', async (req, res) => {
    const idCart = parseInt(req.params.id)
    const listaproducts = await carts.getById(idCart)
    res.json(listaproducts.products)
})

routeCart.post('/:id/products', async (req, res) => {
const cart = {
    timestamp: Date.now(),
    products: []
}
    const id = await carts.save(cart)
    res.json(id)
})

routeCart.post('/:id/products', async (req, res) => {
    const idCart = parseInt(req.params.id)
    const idProduct = req.body.idProduct
    const product = await carts.getById(idProduct)
    const cart = await carts.getById(idCart)
    cart.carts.push(product)
    await carts.update(idCart, cart)
    res.json({
      status: 'ok'
    })
  })

routeCart.delete('/:id/products/:id_prod', async (req, res) => {
    const idCart = parseInt(req.params.id)
    const idProduct = parseInt(req.params.id_prod)
    const cart = await carts.getById(idCart)
    let indexToDelete = -1
    cart.carts.forEach((product, index) => {
      if (product.id == idProduct) {
        indexToDelete = index
      }
    })
    if (indexToDelete => 0) {
      cart.carts.splice(indexToDelete, 1)
    }
    await carts.update(idCart, cart)
    res.json({
      status: 'ok'
    })
})

export { routeCart }