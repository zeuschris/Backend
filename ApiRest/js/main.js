const express = require('express')
const {Router} = express
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/static', express.static(__dirname + '../public'))

class Container {
    constructor(productos){
        this.productos = productos
    }
    save(item){
        this.productos.map((element) => {
            if(element.id >= 1){
               let id = element.id++
        }
    })
        item.id = id
        this.productos.push(item)
        return id
    }
    getById(id){
        let productSelect = null
        this.productos.find((element) => {
            element.id === id
            productSelect = element
        })
        return productSelect
    }
    getAll(){
        return this.productos
    }
    deleteById(id){
        this.productos.forEach((element) => {
            if(element.id === id){
                this.productos.splice(id, 1)
            }
        })
    }
    deleteAll(){
        this.productos = []
    }
}

app.get('/', (req, res) => {
    res.json('ok')
})

app.post('/', (req,res) => {
    res.send('ok')
})

app.put('/', (req,res) => {
    res.send('ok')
})

app.delete('/', (req,res) => {
    res.send('ok')
})

const server = app.listen(PORT, () => {
    console.log(`Server on port ${server.address().port}`)
})

server.on('error', error => console.log(`Ha ocurrido un error: ${error}`))

