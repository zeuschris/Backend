class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = [libros] // object
        this.mascotas = [mascotas] // string object
    }
            getFullName () {
                return `${this.nombre} ${this.apellido}`
        }
            addMascota(mascota){
                this.mascotas.push(mascota)
        }
            countMascotas(){
                return this.mascotas.length
        }
            addBook(nombre, autor){
                return this.libros.push({nombre, autor})
        }
            getBookNames() {
                return this.libros.map(({nombre}) => nombre).join()
        }
}

let persona = new Usuario('Christopher','Montes',[],'cati')

// Fn para agregar mascotas al array
persona.addMascota('dorys')
persona.addMascota('anni')

// Fn para agregar libros al array
persona.addBook('Enloquent Javascript','Marijn Haverbeke')
persona.addBook('El gran libro de HTML5, CSS3 y Javascript','Juan Diego Gauchat')

// Fn de full name
console.log(persona.getFullName())

// Fn contador de mascotas
console.log(persona.countMascotas())

// Fn de obtener los nombre de los libros agregados al array
console.log(persona.getBookNames())

// objecto completo
console.log(persona)