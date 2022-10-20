const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    save = async (producto) => {
        try{
            if (fs.existsSync(this.archivo)){
                let info = await fs.promises.readFile(this.archivo, 'utf-8')
                // Convirtiendo el archivo en array
                let result = JSON.parse(info)
                if (result.length > 0){
                    let lastId = result[result.length-1].id+1
                    let newProduct = {
                        id: lastId,
                        ...producto
                    }
                    result.push(newProduct)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(result, null, 2))
                    return lastId
                }else{
                    // Sobreescribir el array
                    let lastId = 1
                    let newProduct = {
                        id: lastId,
                        ...producto
                    }
                    result.push(newProduct)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(result, null, 2))
                    return lastId
                }
                }else{
                    let newProduct = {
                    id : 1,
                    ...producto
                }
                    await fs.promises.writeFile(this.archivo, JSON.stringify([newProduct], null, 2))
                    return 1
            }
        }catch{(console.log)}
    }
}

    getAll = async () => {
        try {
            if(fs.existsSync(this.archivo)){
                let info= await fs.promises.readFile(this.archivo, 'utf8');
                let result= JSON.parse(info);
                return result;
            }else{
                return "No se encontro el archivo"
        }  
    }catch {(console.log)}
}

    getById(id) = async () => {
        try {
            // buscar que el archivo exista
            if(fs.existsSync(this.archivo)){
            let info= await fs.promises.readFile(this.archivo, 'utf8');
                const dataId = info.find(item => item.id === id);
                if (dataId.length === 0) {
                throw new Error(
                        `Este producto con el id: ${id} no existe.`
                    );
                } else {
                    console.log(`El producto ${id} fue encontrado:\n`, dataId);
                    return dataId;
                }
            }
        } catch (error) {
            console.log(`Error buscando el producto con el id: ${error.message}`);
        }
    }

    deleteById(id) = async () => {
        // buscar que el archivo exista
        try {
          if(fs.existsSync(this.archivo)){
            let info= await fs.promises.readFile(this.archivo, 'utf8');
                // verificar si existe el id
                console.log(`Buscando el producto ${id}`);
                if (info.some(item => item.id === id)) {
                    const data = await this.readFile(this.archivo);
                    // eliminar producto
                    console.log(`Eliminando el producto ${id}...`);
                    const datos = data.filter(item => item.id !== id);
                    this.writeFile(this.archivo, datos);
                    console.log(`El producto ${id} ha sido eliminado`);
                } else {
                    throw new Error(
                        `No se encontro el producto con el id ${id}`
                    );
                }
            }
        } catch{console.log(`Ocurrio un error eliminando el producto`)}
    }
    
    deleteAll() = async () => {
        try {
            // buscar que el archivo exista
            let nuevoArray = [];
            console.log(`Borrando datos...`);
            await this.writeFile(this.archivo, nuevoArray);
            console.log(
                `Se borraron todos los datos del archivo ${this.archivo}`
            );
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando los datos: ${error.message}`
            );
        }
    }

  

module.exports = Contenedor;
