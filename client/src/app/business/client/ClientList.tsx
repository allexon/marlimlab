import { useRef, useEffect } from 'react'
import { ContainerList, ContainerItem, ContainerAvatar } from './styles'
import { clientStore, layoutStore } from '../../../store/index'
import { useClient } from '../../../hooks'
import { ClientRegistration } from './ClientRegistration'

export default function ClientList() {
    
    const client = clientStore(state => state)
    const layout = layoutStore(state => state)

    // // Hooks
    const { fnGetClientList, fnOnChangeClientDataRegister } = useClient()
    
    useEffect(() => {
        fnGetClientList()
    }, [])

    const fnAdd = () => {        
        client.fnReset()
        client.dataRegister[0].CLIENTE_NOME = ''
        client.dataRegister[0].CLIENTE_EMAIL = ''
        client.dataRegister[0].CLIENTE_CELULAR = ''
        client.dataRegister[0].CLIENTE_WHATSAPP = ''
        client.dataRegister[0].CLIENTE_CPF = ''
        client.dataRegister[0].CLIENTE_RG = ''
        client.dataRegister[0].CLIENTE_RG_LOCAL = ''
        client.dataRegister[0].CLIENTE_ENDERECOS = []
        client.dataRegister[0].CLIENTE_EMPRESAS = []
        
        client.fnOnChange('list', client.list);
        layout.fnOnChangeLayout('isVisibleForm', true);
        client.fnOnChange('activeComponent', ClientRegistration);
        client.fnOnChange('activeIdSubMenu', 0);
        client.fnOnChange('activeIndexCompany', -1)
    }

    const fnEdit = (i : number) => {
        let _client = client.list
        const _activeClient = {..._client[i]}
        client.fnOnChange('_id', _activeClient._id)        
        client.fnOnChange('activeIdSubMenu', 0)
        client.fnOnChange('activeComponent', ClientRegistration)
        client.fnOnChange('activeIndexCompany', -1)
        client.fnOnChange('title', 'DADOS DO CLIENTE')
        client.fnOnChange('subTitle', 'Cadastro de dados do cliente')
        client.fnOnChange('dataRegister', [_activeClient])
        layout.fnOnChangeLayout('isVisibleForm', true)
    }

    return (
        <ContainerList>
            <div style={{bottom:'10px', right:'10px', position:'absolute', width:'45px', height:'45px', borderRadius:'100%', backgroundColor:'#08623F'}}>
                <button onClick={() => fnAdd()} style={{backgroundColor:'transparent', width:'100%', height:'100%', borderRadius:'100%', color:'white', fontSize:'25px'}}>
                    +
                </button>
            </div>

            {
                client.list.length > 0 &&
                client.list.map((res : any, i) => {
                    return (
                        <ContainerItem key={i} onClick={() => fnEdit(i)}>                               
                            <span style={{display:'block', lineHeight:'14px', width:'100%', marginTop:'4px', marginBottom:'4px'}}>
                                {res.CLIENTE_NOME}
                            </span>
                        </ContainerItem>
                    )
                })
            }
        </ContainerList>
    )
}