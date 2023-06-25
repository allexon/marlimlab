import { ClienteModel } from '../model/index.js'

const IO_CLIENT_NEW_UPDATE  = 'IO_CLIENT_NEW_UPDATE'
const IO_CLIENT_FIND        = 'IO_CLIENT_FIND'
const IO_CLIENT_LIST        = 'IO_CLIENT_LIST'

export default function ClientIo(ioSocket) {

    ioSocket.on('connection', (socket) => {
        //console.log(':: Socket Conectado ->', socket.id)
        
        // ***************** FIND *****************
        socket.on(IO_CLIENT_FIND, async (id) => {            
            const _res = await ClienteModel.findOne({_id:id}).exec()            
            socket.emit(IO_CLIENT_FIND, _res)
        })

        // *****************  LISTAR *****************  
        socket.on(IO_CLIENT_LIST, async () => {
            const _res = await ClienteModel.find()            
            socket.emit(IO_CLIENT_LIST, _res)
        })

        // *****************  NEW ADDRESS *****************  
        socket.on(IO_CLIENT_NEW_UPDATE, async (data) => {
            data.CLIENTE_NOME = data.CLIENTE_NOME.toUpperCase()

            const fnNewValue = () => {
                return new Promise((resolve, reject) => {
                    ClienteModel.findOne({}, {}, { sort: { 'CLIENTE_ID': -1 } }, (err, lastClient) => {
                        if (err) reject(err);
                        const _value = lastClient ? lastClient.CLIENTE_ID + 1 : 1;
                        let _obj = {...data, CLIENTE_ID: _value}
                        resolve(_obj)
                    })
                })
            }

            if(!data?._id) {
                // ***************** NOVO CLIENTE *****************
                try {
                    let _result = await fnNewValue()
                    let _new = new ClienteModel(_result)
                    await _new.save()                    
                    socket.emit(IO_CLIENT_NEW_UPDATE, {type:'success', message:'Cadastrado salvo com sucesso'})
                } catch (error) {
                    socket.emit(IO_CLIENT_NEW_UPDATE, {type:'error', message:'Não foi possiel salvar o Cadastro!', error:error})
                }
            } else {
                // *****************  ATUALIZAÇÃO DO CLIENTE *****************
                try {

                    await ClienteModel.findByIdAndUpdate(data._id, data)
                    socket.emit(IO_CLIENT_NEW_UPDATE, {type:'success', message:'Cadastro atualizado com sucesso!'})                    
                } catch (error) {
                    //console.log('-ERROR ->', error)
                    socket.emit(IO_CLIENT_NEW_UPDATE, {type:'error', message:'Não foi possivel atualizar o cadastro!'})
                }
            }
        })
    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        console.log(':: Server desconectado ->', socket.id)
    })
}