import { ClienteModel } from '../model/index.js'
import { fnNodemailer } from '../functions/index.js'

const ioLogin = 'IO_LOGIN'

export default function CapixabayIo(ioSocket) {

    ioSocket.on('connection', (socket, req) => {
        //console.log(':: Socket Conectado ->', socket.id)

        // *****************  CAPIXABAY LOGIN *****************  
        socket.on(ioLogin, async (email) => {
            const _data = await ClienteModel.find({CLIENTE_EMAIL:email.toLowerCase()})
            socket.emit(ioLogin, _data)
            //fnNodemailer(email)
            //console.log('-- DADOS DO SERVIDOR -', _data)            
        })

    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        socket.off(ioLogin)
        console.log(':: Server desconectado ->', socket.id)
    })
}