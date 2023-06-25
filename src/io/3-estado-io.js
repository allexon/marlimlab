import { EstadoModel } from '../model/index.js'

//const ioAddressStateNew = 'IO_ADDRESS_STATE_NEW'
//const ioAddressStateUpdate = 'IO_ADDRESS_STATE_UPDATE'
const ioAddressStateList = 'IO_ADDRESS_STATE_LIST'

export default function EstadoIo(ioSocket) {

    ioSocket.on('connection', (socket, req) => {
        //console.log(':: Socket Conectado ->', socket.id)

        // *****************  LISTAR ITENS MENU *****************  
        socket.on(ioAddressStateList, async () => {            
            console.log('--- SERVIDOR REQ ESTADOS ->', req)
            const _res = await EstadoModel.find()
            console.log('--- SERVIDOR FIND ESTADOS ->', _res)
            socket.emit(ioAddressStateList, _res)
        })        
    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        console.log(':: Server desconectado ->', socket.id)
    })
}