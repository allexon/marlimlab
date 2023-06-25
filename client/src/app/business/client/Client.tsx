import { useEffect } from 'react'
import { Main, Container, ContainerBox, TextBox, Label  } from './styles'
import { FormDefault, StrongText, Modal } from '../../default/index'
import { clientStore, layoutStore, marlimThemeStore } from '../../../store/index'
import { CLientSubMenu, ClientList } from './index'

export default function Client() {
    
    const client = clientStore((state : any) => state)
    const layout = layoutStore((state : any) => state)
    const marlimTheme1 = marlimThemeStore((state : any) => state)

    // Render Component
    const ActiveComponent = client.activeComponent;

    useEffect(() => {
        layout.fnOnChangeLayout('sidebarContextComponent', ClientList)
    }, [])

    return (
        <Main>            
            <Modal width='300px' height='200px' />
            <Container align='flex-start'>
                {
                    layout.isVisibleForm &&
                    <FormDefault>
                        <CLientSubMenu />                         
                        {
                            layout.isBlock &&                            
                            <div style={{position:'absolute', zIndex:'10', display:'flex', borderRadius:'5px', top:'0px', left:'0px', backgroundColor:'gray', opacity:'0.5', height:'100%', width:'100%'}}></div>
                        }
                        <StrongText title={client.title} subTitle={client.subTitle} />
                        
                        <ContainerBox>
                            <Label>{client.activeIndexCompany != -1? 'Cliente/Empresa' : 'Cliente'}</Label>
                            <TextBox fontFamily={marlimTheme1.fontOswald}>
                                {
                                    client.activeIndexCompany != -1?
                                        `${ client.dataRegister[0].CLIENTE_NOME.toUpperCase() } | ${ client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].NOME_FANTASIA }` : 
                                        client.dataRegister[0].CLIENTE_NOME.toUpperCase()
                                }
                            </TextBox>
                        </ContainerBox>

                        <div style={{display:'flex', padding:'10px', position:'relative', width:'100%', flexFlow:'row wrap', justifyContent:'center'}}>
                            {ActiveComponent && <ActiveComponent />}
                        </div>
                    </FormDefault>
                }
            </Container>
        </Main>
    )
}