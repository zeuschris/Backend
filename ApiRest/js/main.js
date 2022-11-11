const express = require('express')
const {Router} = express
const app = express()
const PORT = 8080
const pathProducts = Router()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/static', express.static(__dirname + '../public'))

class Container {
    constructor(productos){
        this.productos = productos
    }
    save(item){
        let id = 1
        this.productos.map((element) => {
            if(element.id >= id){
                id = element.id + 1
        }
    })
        item.id = id
        this.productos.push(item)
        return id
    }

    getById(id){
        let productSelect = null
        this.productos.find((element) => {
            if(element.id === id){
                productSelect = element
            }
        })
        return productSelect
    }

    getAll(){
        return this.productos
    }

    deleteById(id){
        this.productos.forEach((element) => {
            element.id === !id
        })
    }

    deleteAll(){
        this.productos = []
    }
}

const productos = new Container ([]);

productos.save({
  title: 'Monitor LG Gamer27',
  price: '40000',
  thumbnail: 'https://www.sintagmatecnologia.com.ar/Temp/App_WebSite/App_PictureFiles/Items/8806091486851_800.jpg'
});

productos.save({
  title: 'Silla Gamer Daewoo',
  price: '23000',
  thumbnail: 'https://www.lavoz.com.ar/resizer/dqVc7U87qN7ExIT1Mp1ECjB4khM=/1200x793/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/JEQFOFZHXVAG7HGFJOVJN4MBSM.jpg'
});

productos.save({
  title: 'Teclado HyperX',
  price: '9500',
  thumbnail: 'https://media.spdigital.cl/__sized__/products/pq2vqokh_880fa69c-thumbnail-1080x1080-70.jpg'
});

productos.save({
  title: 'Mouse Redragon',
  price: '6900',
  thumbnail: 'https://mexx-img-2019.s3.amazonaws.com/37396_4.jpeg'
});


pathProducts.get('/', (req,res) => {
    const listProducts = productos.getAll()
    res.json(listProducts)
})

pathProducts.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const producto = productos.getById(id)
    if ( producto ){
        res.json(producto)
    }else{
        res.status(404)
        res.json({error : `El producto no fue encontrado`})
    }
})

pathProducts.post('/', (req,res) => {
    const producto = req.body;
    productos.save(producto);
    res.send(`El producto se agrego correctamente`);
});

pathProducts.put('/:id', (req,res) => {
    const update = req.body
    const id = req.params.id
    const index = productos.findIndex(producto => producto.id === id)

    if(index >= 0) {
        productos[index] = update
    }
    res.send(productos)
})

pathProducts.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    productos.deleteById(id)
    res.send(`El producto se elimino con exito`)
})

app.use('/api/productos', pathProducts)

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

server.on('error', error => console.log(`Ha ocurrido un error: ${error}`))

