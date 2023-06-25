import { useRef, useEffect } from 'react'
import { messageStore, addressStore, marlimThemeStore } from '../../../store/index'
import { Input, Button, SelectDefault } from '../../default/index'
import { socket } from '../../../functions/index'
import { useGetCepLocal, useGetViaCep } from '../../../hooks/index'
import Select, { SelectInstance } from 'react-select'

export default function AddressCustomRegistration() {    

    // store
    const address = addressStore(state => state)
    const message = messageStore(state => state)
    const theme = marlimThemeStore(state => state)

    // Ref
    const zipCodeRef: any = useRef<HTMLInputElement>(null)    
    const countryRef: any = useRef<HTMLInputElement>(null)
    const ufRef: any = useRef<SelectInstance | null>(null)
    const cityRef: any = useRef<SelectInstance | null>(null)
    const neighBorhoodRef: any = useRef<HTMLInputElement>(null)
    const localeRef: any = useRef<HTMLInputElement>(null)
    const latRef: any = useRef<HTMLInputElement>(null)
    const lonRef: any = useRef<HTMLInputElement>(null)

    const [ fnGetCepLocal ] = useGetCepLocal(address.zipCode)    
    const [ fnGetViaCep ] = useGetViaCep(address.zipCode)
        
    useEffect(() => {        
        fnGetUFs()
        // Esta linha pega os dados CEP local e não deixa executar a função fnGetViaCep
        address.cepData && 
        address.cepData != 'via-cep' && 
        fnPopulateAddress(address.cepData)

        // Se depois de executar a função fnGetCepLocal não encontrar nada executa função fnGetViaCep
        address.cepData == 'via-cep' && 
        fnGetViaCep()
                
        return () => {
            setTimeout(() => {
                socket.off(address.IO_ADDRESS_LIST)
                socket.off(address.IO_ADDRESS_NEW_UPDATE)
            }, 1000)
        }
    }, [address.cepData])

    const fnGetUFs = async () => {        
        socket.emit(address.IO_ADDRESS_UF_LIST, '')        
        socket.on(address.IO_ADDRESS_UF_LIST, (data : any) => {            
            if(data) {
                let _map = data.map((res: any) => {return {label:res.ESTADO_SIGLA, value:res.ESTADO_ID}} )
                address.fnOnChangeAddress('ufs', _map)
                socket.off(address.IO_ADDRESS_UF_LIST)
            }
        })
    }

    const fnGetCities = async (siglaUF : string) => {        
        socket.emit(address.IO_ADDRESS_MUNICIPIO_LIST, siglaUF)
        socket.on(address.IO_ADDRESS_MUNICIPIO_LIST, (data : any) => {            
            if(data) {
                address.fnOnChangeAddress('cities', data)
                socket.off(address.IO_ADDRESS_MUNICIPIO_LIST)
            }
        })
    }

    const fnGetNeighborhoods = async (cityName : string) => {        
        socket.emit(address.IO_ADDRESS_BAIRROS_LIST, cityName)
        socket.on(address.IO_ADDRESS_BAIRROS_LIST, (data : any) => {            
            if(data) {
                address.fnOnChangeAddress('neighborhoods', data)
                socket.off(address.IO_ADDRESS_BAIRROS_LIST)
            }
        })
    }

    const fnPopulateAddress = (data : any) => { 
        address.fnOnChangeAddress('cepData', data.cepData)
        address.fnOnChangeAddress('_id', data._id)
        address.fnOnChangeAddress('id', data.id)
        address.fnOnChangeAddress('zipCode', data?.zipCode)
        address.fnOnChangeAddress('country', data?.country?.toUpperCase())
        address.fnOnChangeAddress('uf', data?.uf?.toUpperCase())
        address.fnOnChangeAddress('city', data?.city?.toUpperCase())
        address.fnOnChangeAddress('neighBorhood', data?.neighBorhood?.toUpperCase())
        address.fnOnChangeAddress('locale', data?.locale?.toUpperCase())
        address.fnOnChangeAddress('lat', data?.lat)
        address.fnOnChangeAddress('lon', data?.lon)
      }
    
    const fnValidFields = () => {        
        let _errors: any[]
        let _hasError: boolean = false
        _errors = [
            {id:1, error: address.zipCode?.trim() == '', message:<span>Por favor informe o <b>[ CEP ]</b></span>},
            {id:2, error: address.zipCode?.trim().length < 10,  message:<span>Digite o cep completo XX.XXX-XXX</span>},
            {id:5, error: address.uf == '', message:<span>Por favor informe o <b>[ ESTADO ]</b></span>},
            {id:6, error: address.city == '', message:<span>Por favor informe o <b>[ MUNÍCIPIO ]</b></span>},
            {id:7, error: address.neighBorhood == '', message:<span>Por favor informe o <b>[ BAIRRO ]</b></span>},
            {id:8, error: address.locale == '', message:<span>Por favor informe o <b>[ LOGRADOURO ]</b></span>}
        ]
        let _errorsFilter = _errors.filter(res => res.error)
        
        _errorsFilter = _errorsFilter.sort((a, b) => {return a.id - b.id})
        
        let _stop = false
        _errorsFilter.map(res => {if(_stop) {return}
            if(res.error) {
                message.fnError(res?.message)
                _hasError = true
                _stop = true
            }
        })
        return _hasError
    }

    const fnMaskCep = (value : string) => {        
        return value.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3')
      }

    const fnReset = () => {
        address.fnResetAddress()
        zipCodeRef.current?.focus()
    }

    const fnSubmit = async () => {
        if(fnValidFields()) {return}
        
        let _obj = {
            _id: null,
            id: null,
            zipCode: address.zipCode.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1$2$3'),
            country: address.country,
            // @ts-ignore
            uf: address.uf.label, 
            // @ts-ignore
            city: address.city.label,
            // @ts-ignore
            neighBorhood: address.neighBorhood.label,
            locale: address.locale,
            lat: address.lat,
            lon: address.lon
        }
        console.log(':: ADDRESS CUSTOM, ->', _obj)

        const fnNewUpdate = (obj : any) => {
            socket.emit(address.IO_ADDRESS_NEW_UPDATE, {..._obj})
            socket.on(address.IO_ADDRESS_NEW_UPDATE, (res) => {
                if(res.type == 'success') {
                    message.fnSuccess(res.message)
                    socket.emit(address.IO_ADDRESS_LIST, '')
                    address.fnResetAddress()
                } else {
                    if(res.type == 'error') {
                        console.log('----- error ->', res.error)
                        message.fnError(res.message)
                    } else {                    
                        message.fnInfo(res.message)
                    }
                }
            })
        }        
        fnNewUpdate(_obj)
       
        socket.on(address.IO_ADDRESS_LIST, (data) => {
            address.fnOnChangeAddress('list', data)
        })
        
    } // END SUBMIT

    return (
        <>
            <Input
                label='CEP' 
                value={address.zipCode}
                fnOnChange={(e) => {
                    address.fnOnChangeAddress('cepManual', '')
                    address.fnOnChangeAddress('zipCode', fnMaskCep(e.target.value))
                }}
                ref={zipCodeRef}                
                fnOnPress={(e) => e && fnGetCepLocal()}
                isValidInput={address.isValidZipCode}                
                autoFocus                
                width='110px'
                required
                title='Campo Obrigatório!'
                fontFamily={theme.fontOswald}
            />

            <Input 
                label='País' 
                value={address.country}
                fnOnChange={(e) => address.fnOnChangeAddress('country', e.target.value)} 
                ref={countryRef} 
                fnOnPress={() => ufRef.current?.focus()} 
                disabled={true}
                width='135px'
            />

            <SelectDefault 
                options={address.ufs} 
                label='Estado' 
                width='120px'
                isClearable
                ref={ufRef}
                fnOnPress={() => cityRef.current?.focus()}
                value={address.uf}
                fnOnChange={(e) => {                    
                    e && address.fnOnChangeAddress('uf', e)
                    e && fnGetCities(e.label)
                    if(e && address.uf) {
                        // @ts-ignore
                        if(e.value != address?.uf?.value) {
                            address.fnOnChangeAddress('uf', '')
                            address.fnOnChangeAddress('city', '')                        
                            address.fnOnChangeAddress('neighBorhood', '')
                            address.fnOnChangeAddress('locale', '')
                        }
                    }
                    if(!e) {
                        address.fnOnChangeAddress('uf', '')
                        address.fnOnChangeAddress('city', '')                        
                        address.fnOnChangeAddress('neighBorhood', '')
                        address.fnOnChangeAddress('locale', '')
                    }
                }}
            />

            <SelectDefault 
                options={address.cities} 
                label='Município'
                isClearable
                ref={cityRef}
                fnOnPress={() => neighBorhoodRef.current?.focus()}                 
                value={address.city}
                fnOnChange={(e) => {                    
                    e && address.fnOnChangeAddress('city', e)
                    e && fnGetNeighborhoods(e.label)
                    if(e && address.city) {
                        // @ts-ignore
                        if(e.value != address?.city?.value) {
                            address.fnOnChangeAddress('neighBorhood', '')
                            address.fnOnChangeAddress('locale', '')
                        }
                    }
                    if(!e) {                        
                        address.fnOnChangeAddress('neighBorhood', '')
                        address.fnOnChangeAddress('locale', '')
                    }
                }}
            />

            <SelectDefault 
                options={address.neighborhoods} 
                label='Bairro'
                isClearable
                ref={neighBorhoodRef}
                fnOnPress={() => localeRef.current?.focus()}                 
                value={address.neighBorhood}
                fnOnChange={(e) => {                    
                    e && address.fnOnChangeAddress('neighBorhood', e)
                    if(e && address.neighBorhood) {
                        // @ts-ignore
                        if(e.value != address?.neighBorhood?.value) {
                            address.fnOnChangeAddress('locale', '')
                        }
                    }
                    if(!e) {
                        address.fnOnChangeAddress('locale', '')
                    }
                }}
            />
            
            <Input 
                label='Logradouro'
                value={address.locale}  
                fnOnChange={(e) => address.fnOnChangeAddress('locale', e.target?.value?.toUpperCase())} 
                ref={localeRef} 
                fnOnPress={() => latRef.current?.focus()}                 
                isValidInput={address.isValidlocale} 
                width='100%'
                disabled={false}
            />

            <Input 
                label='Latitude'
                value={address.lat}  
                fnOnChange={(e) => address.fnOnChangeAddress('lat', e.target.value)} 
                ref={latRef} 
                fnOnPress={() => lonRef.current?.focus()}                 
                isValidInput={address.isValidLat} 
                width='182px'
                disabled={true}
            />

            <Input 
                label='Longitude'
                value={address.lon}  
                fnOnChange={(e) => address.fnOnChangeAddress('lon', e.target.value)} 
                ref={lonRef} 
                fnOnPress={() => zipCodeRef.current?.focus()}                 
                isValidInput={address.isValidLon} 
                width='182px'
                disabled={true}
            />

            {
                address.visibleButtonSave &&
                <div style={{display:'flex', width:'100%', flexFlow:'row wrap', alignItems:'center', justifyContent:'center'}}>
                    <Button className={(message.isLoading) && 'button-disable'} onClick={() => fnSubmit()}>Salvar</Button>
                </div>
            }
            
        </>
    )
}