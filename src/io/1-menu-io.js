import { MenuModel } from '../model/index.js'

const IO_MENU_LIST = 'IO_MENU_LIST'

export default function MenuIo(ioSocket) {

    ioSocket.on('connection', (socket) => {
        //console.log(':: Socket Conectado ->', socket.id)

        // *****************  LISTAR ITENS MENU *****************  
        socket.on(IO_MENU_LIST, async () => {
            const _list = await MenuModel.find()
            // console.log('--- SERVIDOR MENU LISTA ->', _list)
            socket.emit(IO_MENU_LIST, _list)
        })        
    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        console.log(':: Server desconectado ->', socket.id)
    })
}