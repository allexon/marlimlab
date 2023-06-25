import { config } from 'dotenv'
config()

import { db } from './db.js';
db()

import path from 'path'
import express from 'express'
import http from 'http'
import { Server as SocketIo } from 'socket.io'
import cors from 'cors'

// IO COMUNICATION
import menuIo from './io/1-menu-io.js'
import usuarioIo from './io/8-usuario-io.js'
import estadoIo from './io/3-estado-io.js'
import addressIo from './io/6-endereco-io.js'
import clientIo from './io/7-cliente-io.js'
import productRevendaGasIo from './io/9-produto-revenda-gas-io.js'
import capixabayIo from './io/10-capixabay-io.js'

const app = express()
const server = http.createServer(app)
const httpServer = server.listen(process.env.SERVER_LOCAL_PORT)
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use(cors())

// http Routers
import companyRoutes from './routes/companyRoutes.js'
import productRoutes from './routes/productRoutes.js'
import estadosRoutes from './routes/estadosRoutes.js'
import municipiosRoutes from './routes/municipiosRoutes.js'
import bairrosRoutes from './routes/bairrosRoutes.js'

let _socketParam = {  
    cors: {      
      origin: process.env.CLIENT_SOCKET_LOCAL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
}

const fnStartServer = async () => {
  try {    
    app.use('/company', companyRoutes)
    app.use('/product', productRoutes)
    app.use('/estados', estadosRoutes)
    app.use('/municipios', municipiosRoutes)
    app.use('/bairros', bairrosRoutes)
        
    app.listen(8080, () => {      
      console.log('::: SERVIDOR EXECUTANDO EM ->', process.env.SERVER_SOCKET_LOCAL)
    })
  } catch (error) {
    console.log('::: ERROR ->', error)
  }
}
fnStartServer()

const ioSocket = new SocketIo(httpServer, (httpServer, _socketParam))

menuIo(ioSocket)
usuarioIo(ioSocket)
estadoIo(ioSocket)
addressIo(ioSocket)
clientIo(ioSocket)
productRevendaGasIo(ioSocket)
capixabayIo(ioSocket)

