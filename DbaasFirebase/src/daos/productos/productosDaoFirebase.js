const config = require("../../config.js")
const contenedor = require("../../contenedor/contenedorFirebase.js")

const products = new contenedor("products")

const Crud = async () => {
    await config.initFirebase()
    await products.save()
    await products.getAll()
    await products.getById()
    await products.deleteById()
    await products.deleteAll()
}

Crud()