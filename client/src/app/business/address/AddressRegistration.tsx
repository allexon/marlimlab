import { useRef, useEffect } from 'react'
import { messageStore, addressStore, marlimThemeStore } from '../../../store/index'
import { Input, Button } from '../../default/index'
import { socket } from '../../../functions/index'
import { useGetCepLocal, useGetViaCep } from '../../../hooks/index'

export default function AddressRegistration() {    

    // store
    const address = addressStore(state => state)
    const message = messageStore(state => state)
    const theme = marlimThemeStore(state => state)

    // Ref
    const zipCodeRef: any = useRef<HTMLInputElement>(null)    
    const countryRef: any = useRef<HTMLInputElement>(null)
    const ufRef: any = useRef<HTMLInputElement>(null)
    const cityRef: any = useRef<HTMLInputElement>(null)
    const neighBorhoodRef: any = useRef<HTMLInputElement>(null)
    const localeRef: any = useRef<HTMLInputElement>(null)
    const latRef: any = useRef<HTMLInputElement>(null)
    const lonRef: any = useRef<HTMLInputElement>(null)

    const [ fnGetCepLocal ] = useGetCepLocal(address.zipCode)    
    const [ fnGetViaCep ] = useGetViaCep(address.zipCode)
        
    useEffect(() => {        
        // Esta linha pega os dados CEP local e não deixa executar a função fnGetViaCep
        address.cepData && 
        address.cepData != 'via-cep' && 
        fnPopulateAddress(address.cepData)

        // Se depois de executar a função fnGetCepLocal não encontrar nada executa função fnGetViaCep
        if(address.cepData == 'via-cep') {
            fnGetViaCep()
        }
                
        return () => {
            setTimeout(() => {
                socket.off(address.IO_ADDRESS_LIST)
                socket.off(address.IO_ADDRESS_NEW_UPDATE)
            }, 1000)
        }
    }, [address.cepData])

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
            {id:1, error: address.zipCode?.trim() == '',        message:<span>Por favor informe o <b>[ CEP ]</b></span>},
            {id:2, error: address.zipCode?.trim().length < 10,  message:<span>Digite o cep completo XX.XXX-XXX</span>},
            {id:3, error: address.country?.trim() == '',        message:<span>Por favor informe o <b>[ PAÍS ]</b></span>},
            {id:4, error: address.country?.trim().length < 5,   message:<span>O Campo País não pode ser menor que 5</span>},
            {id:5, error: address.uf?.trim() == '',             message:<span>Por favor informe o <b>[ ESTADO ]</b></span>},
            {id:6, error: address.city?.trim() == '',           message:<span>Por favor informe o <b>[ MUNÍCIPIO ]</b></span>},
            {id:7, error: address.neighBorhood?.trim() == '',   message:<span>Por favor informe o <b>[ BAIRRO ]</b></span>},
            {id:8, error: address.locale?.trim() == '',         message:<span>Por favor informe o <b>[ LOGRADOURO ]</b></span>}
        ]
        let _errorsFilter = _errors.filter(res => res.error)
        
        _errorsFilter = _errorsFilter.sort((a, b) => {return a.id - b.id})
        
        let _stop = false
        _errorsFilter.map(res => {if(_stop) {return}
            if(res.error) {
                message.fnError(res.message)
                _hasError = true
                _stop = true
            }
        })
        return _hasError
    }

    const fnDispachCepLocal = () => {
        let _error = address.zipCode?.trim() == ''
        let _error2 = address.zipCode?.trim().length < 10
        if(_error || _error2) {
            message.fnError(<span>Digite o cep completo XX.XXX-XXX</span>)
        } else {
            fnGetCepLocal()
        }
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
            _id: address._id,
            id: !address.id? address.list.length+1 : address.id,
            zipCode: address.zipCode.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1$2$3'),
            country: address.country,
            uf: address.uf,
            city: address.city,
            neighBorhood: address.neighBorhood,
            locale: address.locale,
            ibgeCode: address.ibgeCode,
            ibgeDDD: address.ibgeDDD,
            ibgeSiafi: address.ibgeSiafi,
            lat: address.lat,
            lon: address.lon
        }

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
        console.log(':: OBJETO PARA INCLUSÃO OU UPDATE ->', _obj)
        fnNewUpdate(_obj)
       
        socket.on(address.IO_ADDRESS_LIST, (data) => {
            address.fnOnChangeAddress('list', data)
        })
        
    } // END SUBMIT

    return (
        <div style={{display:'flex', width:'100%', flexFlow:'row wrap', padding:'0px 10px 10px 10px'}}>
            <Input
                label='CEP' 
                value={address.zipCode}
                fnOnChange={(e) => {
                    address.fnOnChangeAddress('cepManual', '')
                    address.fnOnChangeAddress('zipCode', fnMaskCep(e.target.value))
                }}
                ref={zipCodeRef}                
                fnOnPress={(e) => e && fnDispachCepLocal()}
                isValidInput={address.isValidZipCode}
                autoFocus                
                width='130px'                
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
                width='200px'
            />

            <Input 
                label='Estado' 
                value={address.uf} 
                fnOnChange={(e) => address.fnOnChangeAddress('uf', e.target.value)} 
                ref={ufRef} 
                fnOnPress={() => cityRef.current?.focus()} 
                isValidInput={address.isValidState} 
                disabled={true}
                width='80px'
            />

            <Input 
                label='Município' 
                value={address.city} 
                fnOnChange={(e) => address.fnOnChangeAddress('city', e.target.value)} 
                ref={cityRef} 
                fnOnPress={() => neighBorhoodRef.current?.focus()} 
                isValidInput={address.isValidCity}                
                width='100%'
                disabled={true}
            />

            <Input 
                label='Bairro' 
                value={address.neighBorhood} 
                fnOnChange={(e) => address.fnOnChangeAddress('neighBorhood', e.target.value)} 
                ref={neighBorhoodRef}
                fnOnPress={() => localeRef.current?.focus()}                 
                isValidInput={address.isValidNeighBorhood} 
                width='100%'
                disabled={true}
            />

            <Input 
                label='Logradouro'
                value={address.locale}  
                fnOnChange={(e) => address.fnOnChangeAddress('locale', e.target.value)} 
                ref={localeRef} 
                fnOnPress={() => latRef.current?.focus()}                 
                isValidInput={address.isValidlocale} 
                width='100%'
                disabled={true}
            />

            <Input 
                label='Latitude'
                value={address.lat}  
                fnOnChange={(e) => address.fnOnChangeAddress('lat', e.target.value)} 
                ref={latRef} 
                fnOnPress={() => lonRef.current?.focus()}                 
                isValidInput={address.isValidLat} 
                width='207px'
                disabled={true}
            />

            <Input 
                label='Longitude'
                value={address.lon}  
                fnOnChange={(e) => address.fnOnChangeAddress('lon', e.target.value)} 
                ref={lonRef} 
                fnOnPress={() => zipCodeRef.current?.focus()}                 
                isValidInput={address.isValidLon} 
                width='207px'
                disabled={true}
            />
            
            {
                 address.visibleButtonSave &&
                 <div style={{display:'flex', width:'100%', flexFlow:'row wrap', alignItems:'center', justifyContent:'center'}}>
                    <Button className={(message.isLoading) && 'button-disable'} onClick={() => fnSubmit()}>Salvar</Button>
                </div>
            }
        </div>
    )
}