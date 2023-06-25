import { EnderecoModel, BairroModel, EstadoModel, CidadeModel } from '../model/index.js'

const IO_ADDRESS_NEW_UPDATE         = 'IO_ADDRESS_NEW_UPDATE'
const IO_ADDRESS_FIND               = 'IO_ADDRESS_FIND'
const IO_ADDRESS_LIST               = 'IO_ADDRESS_LIST'
const IO_ADDRESS_UF_LIST            = 'IO_ADDRESS_UF_LIST'
const IO_ADDRESS_MUNICIPIO_LIST     = 'IO_ADDRESS_MUNICIPIO_LIST'
const IO_ADDRESS_BAIRROS_LIST       = 'IO_ADDRESS_BAIRROS_LIST'

export default function AddressIo(ioSocket) {

    ioSocket.on('connection', (socket) => {
        //console.log(':: Socket Conectado ->', socket.id)

        // ***************** FIND CEP MARLIM_DB *****************  
        socket.on(IO_ADDRESS_FIND, async (cep) => {
            const _res = await EnderecoModel.find({ENDERECO_CEP:cep})
            socket.emit(IO_ADDRESS_FIND, _res)
        })

        // LISTA DE ESTADOS
        socket.on(IO_ADDRESS_UF_LIST, async () => {
            const _res = await EstadoModel.find()
            socket.emit(IO_ADDRESS_UF_LIST, _res)
        })

        // LISTA DE MUNICIPIOS
        socket.on(IO_ADDRESS_MUNICIPIO_LIST, async (siglaUF) => {            
            let _res = await CidadeModel.find({CIDADE_ESTADO_SIGLA:siglaUF})
            let array = []
            _res.map(res => {
                array.push({label: res.CIDADE_CIDADE, value:parseInt(res.CIDADE_ID)})
            })
            socket.emit(IO_ADDRESS_MUNICIPIO_LIST, array)
        })

        // LISTA DE BAIRRO
        socket.on(IO_ADDRESS_BAIRROS_LIST, async (cityName) => {
            let _res = await BairroModel.find({BAIRRO_CIDADE:cityName})            
            let array = []
            _res.map(res => {
                array.push({label: res.BAIRRO_BAIRRO, value:parseInt(res.BAIRRO_ID)})
            })
            socket.emit(IO_ADDRESS_BAIRROS_LIST, array)
        })

        // *****************  NEW ADDRESS *****************  
        socket.on(IO_ADDRESS_NEW_UPDATE, async (data) => {
            const _mountAddress = await BairroModel.find({BAIRRO_BAIRRO:data.neighBorhood})

            let _obj = {
                _id:                        data._id,
                ENDERECO_ID:                data.id,
                ENDERECO_CEP:               data.zipCode.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1$2$3'),
                ENDERECO_PAIS:              _mountAddress[0].BAIRRO_PAIS,
                ENDERECO_PAIS_ID:           _mountAddress[0].BAIRRO_PAIS_ID,
                ENDERECO_PAIS_SIGLA:        _mountAddress[0].BAIRRO_PAIS_SIGLA,
                ENDERECO_IBGE_ID:           data.ibgeCode,
                ENDERECO_IBGE_SIAFI:        data.ibgeSiafi,
                ENDERECO_IBGE_DDD:          data.ibgeDDD,
                ENDERECO_ESTADO:            _mountAddress[0].BAIRRO_ESTADO,
                ENDERECO_ESTADO_ID:         _mountAddress[0].BAIRRO_ESTADO_ID,
                ENDERECO_ESTADO_SIGLA:      _mountAddress[0].BAIRRO_ESTADO_SIGLA,
                ENDERECO_CIDADE:            _mountAddress[0].BAIRRO_CIDADE,
                ENDERECO_CIDADE_ID:         _mountAddress[0].BAIRRO_CIDADE_ID,
                ENDERECO_BAIRRO:            _mountAddress[0].BAIRRO_BAIRRO,
                ENDERECO_BAIRRO_ID:         _mountAddress[0].BAIRRO_ID,
                ENDERECO_LOGRADOURO_TYPE:   data.locale?.split(' ')[0],
                ENDERECO_LOGRADOURO:        data.locale,
                ENDERECO_LAT:               data.lat,
                ENDERECO_LON:               data.lon,
                ENDERECO_ENDERECO_COMPLETO: [data.locale?.split(' ')[0], data.locale, _mountAddress[0].BAIRRO_PAIS, _mountAddress[0].BAIRRO_ESTADO, _mountAddress[0].BAIRRO_CIDADE,  _mountAddress[0].BAIRRO_BAIRRO, data.zipCode]
            }
             console.log('---- server dados ->', _obj)
            if(!data._id) {
                // ***************** NEW ENDEREÇO *****************
                try {
                    const _address = new EnderecoModel(_obj)
                    await _address.save()
                    socket.emit(IO_ADDRESS_NEW_UPDATE, {type:'success', message:'Endereço cadastrado com sucesso'})
                } catch (error) {
                    socket.emit(IO_ADDRESS_NEW_UPDATE, {type:'error', message:'Não foi possivel cadastrar endereço!', error:error})
                }
            } else {
                // *****************  UPDATE ENDEREÇO *****************
                try {
                    await EnderecoModel.findByIdAndUpdate(_obj._id, _obj)
                    socket.emit(IO_ADDRESS_NEW_UPDATE, {type:'success', message:'Endereço Atualizado com sucesso!'})
                } catch (error) {
                    socket.emit(IO_ADDRESS_NEW_UPDATE, {type:'error', message:'Não foi possivel atualizar o endereço!', error:error})
                }
            }
        })

        // *****************  LISTAR *****************  
        socket.on(IO_ADDRESS_LIST, async () => {
            const _res = await EnderecoModel.find()
            socket.emit(IO_ADDRESS_LIST, _res)
        })

    }) // end connection

    ioSocket.on('disconnect', (socket) => {
        console.log(':: Server desconectado ->', socket.id)
    })
}