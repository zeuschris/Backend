const Contenedor = require("./Contenedor");
let contenedor= new Contenedor("productos.txt")

let producto1 ={
    title: "boligrafo parker",
    price: 7500,
    thumbnail: "https://medias.musimundo.com/medias/00476007-144936-144936-01-144936-01.jpg"

}

let producto2 ={
    title: "mochila jeansport",
    price: 10200,
    thumbnail: "https://medias.musimundo.com/medias/00558060-146480-146480-01-146480-01.jpg"

}

let producto3 ={
    title: "cuadro de audrey",
    price: 20500,
    thumbnail: "https://medias.musimundo.com/medias/00199039-135728-135728-01-135728-01.jpg"

}

fns = async () => {

    console.log( await contenedor.save(producto1))
    console.log( await contenedor.save(producto2))
    console.log( await contenedor.save(producto3))
    
    console.log( await contenedor.getAll())
    console.log( await contenedor.getById(3))
    console.log( await contenedor.deleteById(2))
    console.log( await contenedor.deleteAll())
}

fns()
