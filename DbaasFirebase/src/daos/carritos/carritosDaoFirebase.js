const config = require("../../config.js")
const contenedor = require("../../contenedor/contenedorFirebase.js")

const carts = new contenedor("carritos")

const Crud = async () => {
    await config.initFirebase()
    await carts.save[{
        timestamp: 1670919375156,
        title: "Apple",
        description: "",
        code: "159",
        photo: "https://cdn-icons-png.flaticon.com/128/415/415682.png",
        price: 1000,
        stock: 50
    }]
}

Crud()