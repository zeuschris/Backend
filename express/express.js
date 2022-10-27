const express = require('express')
const fs = require('fs')
const app = express()
const Contenedor = require('./contenedor')
let productos = new Contenedor("./productos.json")
const PORT = 8080

app.set('AppName', 'Backend_Products')


app.use((req,res,next) => {
    console.log(req.path)
    console.log(req.body)
    console.log(req.method)
    next()
})


app.get('/', (req,res) => {
    res.send(`<h1>Home</h1>`)
})


app.get('/productos', (req, res) => {
    const viewProducts = async () => {
        try{
            const mostrarProductos = await productos.getAll()
            let item = ``
            mostrarProductos.map((prod) => {
                
                item += `
                 <div>
                 <h2>Name: ${prod.title}</h2>
                 <p>ID: ${prod.id}</p>
                 <img src= "${prod.thumbnail}" style="margin:10px 0" height="150px" alt="${prod.title}">
                 <b style=display:block;>Price: $${prod.price}</b>
                 </div>

                 `
            })
            res.send(`<h1 style="text-align:center">Productos</h1> ${item}`)
        }catch(error){
            console.log(`Ha ocurrido un error al cargar los productos: ${error}`)
        }
    }
    viewProducts()
})

app.get('/productorandom', (req,res) => {
    const index = async () => {
        try{
            const productsJSON = await productos.getAll()
            let random = Math.floor(Math.random() * productsJSON.length);
            const producto = await productos.getById(random + 1);
            let bgProd = `

                <div>
                    <h2>Name: ${producto?.title}</h2>
                    <p>ID: ${producto?.id}</p>
                    <img src= "${producto?.thumbnail}" style="margin:10px 0" height="150px" alt="${producto?.title}">
                    <b style=display:block;>Price: $${producto?.price}</b>
                </div>
            
            `
            res.send(`<h1 style="text-align:center">Productos Random</h1> ${bgProd}`)
            console.log(producto)

        }catch(error){
            console.log(`Error al cargar el producto: ${error}`)
        }
    }
    index()
})



app.use((req,res) => {
    res.status(401).json({
        error : 'Error 401'
    })
})


const conectServer = app.listen(PORT, () => {
    console.log(app.get('AppName'))
    console.log(`App escuchando en el puerto ${conectServer.address().port}`)
}) 


conectServer.on('error', error => console.log(`Ha ocurrido un  error: ${error}`))

