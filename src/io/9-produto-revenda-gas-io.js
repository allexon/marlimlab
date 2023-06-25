import { ProdutoRevendaGasModel } from '../model/index.js'

const IO_PRODUCT_REVENDA_GAS_NEW_UPDATE = 'IO_PRODUCT_REVENDA_GAS_NEW_UPDATE'
const IO_PRODUCT_REVENDA_GAS_FIND       = 'IO_PRODUCT_REVENDA_GAS_FIND'
const IO_PRODUCT_REVENDA_GAS_LIST       = 'IO_PRODUCT_REVENDA_GAS_LIST'

export default function ProductGasReSaleIo(ioSocket) {

    ioSocket.on('connection', (socket) => {
        //console.log(':: Socket Conectado ->', socket.id)
        
        // ***************** FIND *****************
        socket.on(IO_PRODUCT_REVENDA_GAS_FIND, async (id) => {            
            const _res = await ProdutoRevendaGasModel.findOne({_id:id}).exec()
            socket.emit(IO_PRODUCT_REVENDA_GAS_FIND, _res)
        })

        // *****************  LISTAR *****************  
        socket.on(IO_PRODUCT_REVENDA_GAS_LIST, async () => {
            const _res = await ProdutoRevendaGasModel.find()            
            socket.emit(IO_PRODUCT_REVENDA_GAS_LIST, _res)
        })

        // *****************  NEW ADDRESS *****************  
        socket.on(IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, async (data) => {

            console.log('::: DATA REVENDA GAS SERVER -->', data)

            const fnLastId = () => {
                return new Promise((resolve, reject) => {
                    ProdutoRevendaGasModel.findOne({}, {}, { sort: { 'PRODUTO_REVENDA_GAS_ID': -1 } }, (err, lastId) => {
                        if (err) reject(err);
                        const _value = lastId ? lastId.PRODUTO_REVENDA_GAS_ID + 1 : 1;
                        let _obj = {...data, PRODUTO_REVENDA_GAS_ID: _value}
                        resolve(_obj)
                    })
                })
            }

            if(!data?._id) {
                // ***************** NOVO PRODUTO *****************
                try {
                    let _result = await fnLastId()
                    let _new = new ProdutoRevendaGasModel(_result)
                    await _new.save()
                    socket.emit(IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, {type:'success', message:'Cadastrado salvo com sucesso'})
                } catch (error) {
                    socket.emit(IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, {type:'error', message:'Não foi possiel salvar o Cadastro!', error:error})
                }
            } else {
                // *****************  ATUALIZAÇÃO DO PRODUTO *****************
                try {

                    await ProdutoRevendaGasModel.findByIdAndUpdate(data._id, data)
                    socket.emit(IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, {type:'success', message:'Cadastro atualizado com sucesso!'})                    
                } catch (error) {
                    //console.log('-ERROR ->', error)
                    socket.emit(IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, {type:'error', message:'Não foi possivel atualizar o cadastro!'})
                }
            }
        })
    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        console.log(':: Server desconectado ->', socket.id)
    })
}