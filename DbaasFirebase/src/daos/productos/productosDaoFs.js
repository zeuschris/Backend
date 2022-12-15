import { Contenedor } from '../../contenedor/containerFs.js'

class productosDaoFs extends Contenedor {
    constructor(){
        super('src/db/products.txt')
    }
}

export default productosDaoFs