import { useEffect } from 'react'
import { ContainerList, ContainerItem, ContainerAvatar } from './styles'
import { addressStore, layoutStore } from '../../../store/index'
import { socket } from '../../../functions'

export default function AddressList() {
    
    const address = addressStore(state => state)
    const layout = layoutStore(state => state)
    
    useEffect(() => {
        fnGetList()        
        return () => {socket.off(address.IO_ADDRESS_LIST)}
    }, [])

    const fnGetList = async () => {        
        socket.emit(address.IO_ADDRESS_LIST, '')
        socket.on(address.IO_ADDRESS_LIST, (data : any) => {            
            address.fnOnChangeAddress('list', data)
        })
    }

    const fnEdit = (i : number) => {
        // console.log('--- ADDRESS ->', address.list[i])
        let _data = address.list[i]
        address.fnOnChangeAddress('_id', _data?._id)
        address.fnOnChangeAddress('id', _data.ENDERECO_ID)
        address.fnOnChangeAddress('zipCode', _data.ENDERECO_CEP.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3'))
        address.fnOnChangeAddress('locale', _data.ENDERECO_LOGRADOURO)
        address.fnOnChangeAddress('neighBorhood', _data.ENDERECO_BAIRRO)
        address.fnOnChangeAddress('city', _data.ENDERECO_CIDADE)
        address.fnOnChangeAddress('uf', _data.ENDERECO_ESTADO_SIGLA)        
        address.fnOnChangeAddress('country', _data.ENDERECO_PAIS)
        address.fnOnChangeAddress('lat', _data.ENDERECO_LAT)
        address.fnOnChangeAddress('lon', _data.ENDERECO_LON)
        address.fnOnChangeAddress('cepManual', '')
        layout.fnOnChangeLayout('isVisibleForm', true)
    }
    
    return (                        
        <ContainerList>
            <div style={{bottom:'10px', right:'10px', position:'absolute', width:'45px', height:'45px', borderRadius:'100%', backgroundColor:'#08623F'}}>
                <button 
                    onClick={() => {
                        let _list = address.list
                        address.fnResetAddress()
                        address.fnOnChangeAddress('list', _list);
                        layout.fnOnChangeLayout('isVisibleForm', true);
                    }} 
                    style={{backgroundColor:'transparent', width:'100%', height:'100%', borderRadius:'100%', color:'white', fontSize:'25px'}}>
                    +
                </button>
            </div>

            {
                address.list.length > 0 &&
                address.list.map((res : any, i) => {
                    return (
                        <ContainerItem key={i} onClick={() => fnEdit(i)}>                               
                                <span style={{display:'block', lineHeight:'14px', width:'100%', marginTop:'4px', marginBottom:'4px'}}>{`${res.ENDERECO_CEP} | ${res.ENDERECO_BAIRRO} | ${res.ENDERECO_LOGRADOURO}`}</span>
                            </ContainerItem>
                    )
                })
            }
        </ContainerList>
    )
}