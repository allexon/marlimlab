import { UsuarioModel } from '../model/index.js'

const USER_NEW      = 'USER_NEW'
const USER_UPDATE   = 'USER_UPDATE'
const USER_LIST     = 'USER_LIST'

export default function UsuariosIo(ioSocket) {

    ioSocket.on('connection', (socket) => {
        //console.log(':: Socket Conectado ->', socket.id)

        // *****************  NEW USER *****************  
        socket.on(USER_NEW, async (data) => {            
            let _isDb    = (await UsuarioModel.find({_id:data._id})).length > 0
            let _isEmail = (await UsuarioModel.find({email:data.email})).length > 0
                        
            console.log('::::::: is E-mail, is DB :::::: ->', _isEmail, _isDb)
                        
            // ----- 100% NOVO -----
            if(!_isDb && !_isEmail) {
                try {
                    const _user = new UsuarioModel(data)
                    await _user.save()
                    socket.emit(USER_NEW, {type:'success', message:'Usuário Adicionado com sucesso!'})
                } catch (error) {
                    socket.emit(USER_NEW, {type:'error', message:'Não foi possivel fazer o cadastro!', error:error})
                }
            }

            // ----- 100% NOVO mais o e-mail já esta cadastrado, por isso não faz o cadastro -----
            if(!_isDb && _isEmail) {
                socket.emit(USER_NEW, {type:'info', message:`E-mail ${data.email} já cadastrado!`})
            }
        })
        
        // *****************  UPDATE USER *****************  
        socket.on(USER_UPDATE, async (data) => {            
            try {
                await UsuarioModel.findByIdAndUpdate(data._id, data)
                socket.emit(USER_UPDATE, {type:'success', message:'Usuário Atualizado com sucesso!'})
            } catch (error) {
                socket.emit(USER_UPDATE, {type:'error', message:'Não foi possivel fazer o atualizar!', error:error})
            }
        })

        // *****************  LISTAR *****************  
        socket.on(USER_LIST, async () => {
            const _res = await UsuarioModel.find()
            socket.emit(USER_LIST, _res)
        })
        
    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        console.log(':: Server desconectado ->', socket.id)
    })
}