import axios from 'axios'
import { addressStore } from '../store/index'

export default function useGetViaCep(cep: string)  {
    
    const address = addressStore(state => state)

    const fnLatLon = async (values : any) => {        
        let _arrayAddressOSM: any = []
        let _strFindAddress: string
        let latLon : any[] 
        latLon = []
    
        // O Endereço Precisa ficar desta Forma para conseguir pesquisar [ LATITUDE ] e [ LOGINTUDE ]
        // -> 'Rua+Quinze+Carapina+Grande+Serra+ES+Brasil'
        _arrayAddressOSM.push(`${values.locale.toUpperCase().trim()} ${values.neighBorhood.toUpperCase().trim()} ${values.city.toUpperCase().trim()} ${values.uf.trim()} BRASIL`)
        _arrayAddressOSM = _arrayAddressOSM[0].split(' ')
        _arrayAddressOSM = _arrayAddressOSM.map((res : any) => res.split(' ')+'+')
        _strFindAddress = _arrayAddressOSM.toString()
        _strFindAddress = _strFindAddress.replace(/,/g, '')
        _strFindAddress = _strFindAddress.substring(0, _strFindAddress.length - 1)
        
        try {
          const _res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${_strFindAddress}&format=json&polygon=1&addressdetails=1`)          
          latLon = _res?.data? _res?.data : []    
          latLon = latLon.filter((res: any) => res?.address?.suburb?.toUpperCase() == values.neighBorhood?.toUpperCase().trim())
          latLon.length > 0?  [latLon[0].lat, latLon[0].lon] : null
          return latLon
        } catch (error) {
          return latLon
        }
        finally  {
          return latLon
        }
      }

      const fnGetViaCep = async () => {
        //address.fnResetAddress()
        let _cep = address.zipCode.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1$2$3')
        try {            
          const response = await fetch(`https://viacep.com.br/ws/${_cep}/json/`)
          const _res = await response.json()
          
          if(_res.erro) {                        
            let _list = address.list            
            address.fnOnChangeAddress('locale','')
            address.fnOnChangeAddress('list', _list)
            address.fnOnChangeAddress('zipCode', _cep.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3'))            
            address.fnOnChangeAddress('cepError', _res.erro)
            address.fnOnChangeAddress('cepManual', 'sim')
            address.fnOnChangeAddress('country', 'BRASIL')
          } else {            
            const _values : any = {
              _id: _res?._id,
              id: _res.id,
              zipCode: _res.cep.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3'),
              country: 'BRASIL',
              ufState: '',
              uf: _res.uf,
              city: _res.localidade,
              neighBorhood: _res.bairro,
              locale: _res.logradouro,
              ibgeCode: _res.ibge,
              ibgeDDD: _res.ddd,
              ibgeSiafi: _res.siafi,
              lat:  '',
              lon:  ''
            }
            
            let _result: any = await fnLatLon(_values)
            
            if(_result.length > 0) {
                _values.lat = _result[0].lat
                _values.lon = _result[0].lon
                address.fnOnChangeAddress('cepManual', '')
                address.fnOnChangeAddress('cepData', _values)
            } else {              
              address.fnOnChangeAddress('cepManual', '')
              address.fnOnChangeAddress('cepData', _values)
            }
            
          }
        } catch (e : any) {
            address.fnOnChangeAddress('cepData', null)
            address.fnOnChangeAddress('cepError', e)
        }
      }

    return [fnGetViaCep] as const
}