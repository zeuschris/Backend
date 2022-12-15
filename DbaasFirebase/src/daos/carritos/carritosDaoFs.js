import { Contenedor } from '../../contenedor/containerFs.js'

class CarritosDaoMemoria extends Contenedor {
    constructor(){
        super('src/db/cart.txt')
    }
}

export default CarritosDaoMemoria