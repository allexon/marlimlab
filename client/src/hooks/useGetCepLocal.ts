import { socket } from '../functions/index'
import { addressStore } from '../store/index'

export default function useGetCepLocal(cep: string)  {

    const address = addressStore(state => state)
    
    const fnGetCepLocal = () => {
        
        try {
            socket.emit(address.IO_ADDRESS_FIND, cep.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1$2$3'))
            socket.on(address.IO_ADDRESS_FIND, (res) => {                
                if(res.length == 1) {                    
                    let _values: any = {
                        _id: res[0]?._id,
                        id: res[0].id,
                        zipCode: res[0].ENDERECO_CEP.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3'),
                        country: 'BRASIL',
                        ufState: res[0].ENDERECO_ESTADO,
                        uf: res[0].ENDERECO_ESTADO_SIGLA,
                        city: res[0].ENDERECO_CIDADE,
                        neighBorhood: res[0].ENDERECO_BAIRRO,
                        locale: res[0].ENDERECO_LOGRADOURO,
                        ibgeCode: res[0].ENDERECO_IBGE_ID,
                        ibgeDDD: res[0].ENDERECO_IBGE_DDD,
                        ibgeSiafi: res[0].ENDERECO_IBGE_SIAFI,
                        lat:  res[0].ENDERECO_LAT,
                        lon:  res[0].ENDERECO_LON,
                    }
                    address.fnOnChangeAddress('cepManual', '')
                    address.fnOnChangeAddress('cepData', _values)
                } else {
                    address.fnOnChangeAddress('cepData', 'via-cep')
                }
            })  
        } catch (error: any) {            
            //address.fnResetAddress()
            address.fnOnChangeAddress('cepError', error)
          }
          finally {            
            setTimeout(() => {
                socket.off(address.IO_ADDRESS_FIND)    
            }, 1000)
          }
    }
    return [fnGetCepLocal] as const
}