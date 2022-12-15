import mongoose from 'mongoose'

await mongoose.connect(url, options)

export class Contenedor {
    constructor(productos) {
      this.productos = productos
    }
  
    save(objeto) {
  
      if (objeto.id) {
        this.productos.push(objeto)
        return objeto.id
      }
  
      let id = 1
      this.productos.forEach((element, index) => {
        if (element.id >= id) {
          id = element.id + 1
        }
      })
      objeto.id = id
      this.productos.push(objeto)
      return id
    }
  
    getById(id) {
      let objetoSeleccionado = null
      this.productos.forEach(element => {
        if (element.id == id) {
          objetoSeleccionado = element
        }
      })
      return objetoSeleccionado
    }
  
    update(producto) {
      this.productos = this.productos.map((element) => {
        if (element.id == producto.id) {
          return producto
        }
        return element
      })
    }
  
    getAll() {
      return this.productos
    }
  
    deleteById(id) {
      let indexSeleccionado = -1
      this.productos.forEach((element, index) => {
        if (element.id == id) {
          indexSeleccionado = index
        }
      })
      if (indexSeleccionado != -1) {
        this.productos.splice(indexSeleccionado, 1)
      }
      
    }
  
    deleteAll() {
      this.productos = []
    }
  }
  