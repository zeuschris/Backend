//Servidor************
import express from "express"
import moment from "moment"
const aplicacion = express()
import { Server } from "socket.io"
import http from "http"
import { Contenedor } from './contenedor/ContainerSql.js'
import { options } from "./connection/options.js"
import { mysqlFunc, sqlite3Func } from "./connection/createdb.js"

const port = 8080
const publicRoot = './public'
aplicacion.use(express.json())
aplicacion.use(express.urlencoded({ extended: true }))

const httpServer = new Server(aplicacion)
const io = new IOServer(httpServer)

aplicacion.use(express.static(publicRoot))

import knex from "knex"
const connectionMySql = knex(options.mysql)
const connectionSqlite3 = knex(options.sqlite3)

const productos = new Contenedor(connectionMySql, 'productos');
const mensajes = new Contenedor(connectionSqlite3, 'mensajes');

mysqlFunc()
sqlite3Func()


aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot })
})


//Servidor
const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`)
})

servidor.on('error', error => console.log(`Error: ${error}`))


//Sockets
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!')

  const listaProductos = await productos.getAll()
  socket.emit('nueva-conexion', listaProductos)

  socket.on("new-product", (data) => {
    productos.save(data)
    io.sockets.emit('producto', data)
  })

  //Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await mensajes.getAll()
  socket.emit('messages', listaMensajes)

  //Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss')
    await mensajes.save(data)
    const listaMensajes = await mensajes.getAll()
    io.sockets.emit('messages', listaMensajes)
  })
})