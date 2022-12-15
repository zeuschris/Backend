import express from 'express'
import ContenedorProductos from '../daos/productos/productosDaoFs.js'
import ContenedorCarritos from '../daos/carritos/carritosDaoFs.js'
const routeCart = express.Router()

const carts = new ContenedorCarritos()
const products = new ContenedorProductos()


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
    const product = await products.getById(idProduct)
    const cart = await carts.getById(idCart)
    cart.products.push(product)
    await products.update(idCart, carts)
    res.json({
      status: 'ok'
    })
  })

routeCart.delete('/:id/products/:id_prod', async (req, res) => {
    const idCart = parseInt(req.params.id)
    const idProduct = parseInt(req.params.id_prod)
    const cart = await carts.getById(idCart)
    let indexToDelete = -1
    cart.products.forEach((product, index) => {
      if (product.id == idProduct) {
        indexToDelete = index
      }
    })
    if (indexToDelete => 0) {
      carts.products.splice(indexToDelete, 1)
    }
    await carts.update(idCart, carts)
    res.json({
      status: 'ok'
    })
})

export { routeCart }