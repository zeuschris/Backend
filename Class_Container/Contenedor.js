const fs= require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo=archivo;
      }
    
    save=async(producto)=>{
       try {
        //generar el archivo
        if(fs.existsSync(this.archivo)){
           let productos= await this.getAll();
           if( productos.length>0){
           let lastiId=productos[productos.length-1].id+1
           let newProduct={
             id: lastiId,
            ...producto
           }
           productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }else{
            let lastiId=1
            let newProduct={
              id: lastiId,
             ...producto
            }
            productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }
    
        }else{
        //generamos un producto con id 1 ya que es la creacion del archivo
        let newProduct={
        id:1,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail
        //... producto utilizamos el spread operator para copiar la informacion dentro del nuevo producto
        }
         await fs.promises.writeFile(this.archivo,JSON.stringify([newProduct],null,2));
        return 1;
        }
        } catch (error) {
        console.log(error)
      }
  }

    async getAll() {
      try {
          if(fs.existsSync(this.archivo)){
          let info= await fs.promises.readFile(this.archivo, 'utf8');
          let result= JSON.parse(info);
          return result;
          }
          else{
            return "No se encontro el archivo"
          }  
      } catch (error) {
          console.log(error)
      }  
    }

    async getById(id) {
      try {
          // chequeo que exista el documento
          if(fs.existsSync(this.archivo)){
            let info= await fs.promises.readFile(this.archivo, 'utf8');
          // uso filter para buscar el producto con el id que queramos
              const dataId = info.filter(item => item.id === id);
              if (dataId.length === 0) {
              throw new Error(
                      "No se encontro un producto con el id solicitado"
                  );
              } else {
                  console.log(`Producto con id ${id} encontrado:\n`, dataId);
                  return dataId;
              }
          }
      } catch (error) {
          console.log(`Error buscando producto con el id: ${error.message}`);
      }
  }

  async deleteById(id) {
    // chequeo si existe el documento
    try {
      if(fs.existsSync(this.archivo)){
        let info= await fs.promises.readFile(this.archivo, 'utf8');
            // verifico que exista el id 
            console.log(`Buscando producto con el id solicitado...`);
            if (info.some(item => item.id === id)) {
                const data = await this.readFile(this.archivo);
                // elimino producto
                console.log(`Eliminando producto con id solicitado...`);
                const datos = data.filter(item => item.id !== id);
                this.writeFile(this.archivo, datos);
                console.log(`Producto con el id ${id} eliminado`);
            } else {
                throw new Error(
                    `No se encontro el producto con el id ${id}`
                );
            }
        }
    } catch (error) {
        console.log(
            `Ocurrio un error eliminando el producto con el id solicitado: ${error.message}`
        );
    }
}

async deleteAll() {
    try {
        // chequeo si existe el documento
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
}

module.exports = Contenedor