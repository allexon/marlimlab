import { ContainerSubMenu, ButtonSubMenu, IconButton } from './styles'
import { clientStore, layoutStore, menuStore } from '../../../store/index'
import { useClient } from '../../../hooks'
import { ClientRegistration, ClientCompanySubMenu, ClientSocialMedia,  ClientCompanyList } from './index'

type Props = {    
    icon?: string,
    id?: number,
    activeId?: number
}

export default function ClientSubMenu(props : Props) {
    
    const client = clientStore(state => state)
    const layout = layoutStore(state => state)
        
    const fnResetActiveIndexCompeny = () => {
        client.fnOnChange('activeIndexCompany', -1)
    }
    
    return (
        <ContainerSubMenu>
            {
                layout.isBlock &&                            
                <div style={{position:'absolute', zIndex:'10', display:'flex', borderRadius:'5px', top:'0px', left:'0px', backgroundColor:'gray', opacity:'0.5', height:'100%', width:'100%'}}></div>
            }
            <div style={{backgroundColor:'#002F4E'}}>
                <ButtonSubMenu>
                    <IconButton 
                        id={client.idSubMenu[0]}
                        activeId={client.activeIdSubMenu} 
                        label='Meus Dados' 
                        width='70px' 
                        fontSize='28px'
                        className='icon-000263-torso icon-bg'
                        onClick={() => {
                            client.fnOnChange('activeComponent', ClientRegistration)
                            client.fnOnChange('activeIdSubMenu', 0)                            
                            client.fnOnChange('title', 'DADOS DO CLIENTE');
                            client.fnOnChange('subTitle', 'Cadastro de dados do cliente');
                            fnResetActiveIndexCompeny()
                        }} 
                    />
                </ButtonSubMenu>
                
                <ButtonSubMenu>
                    <IconButton 
                        id={client.idSubMenu[1]}
                        activeId={client.activeIdSubMenu} 
                        label='Minhas Redes Sociais' 
                        width='110px' 
                        fontSize='20px'
                        className='icon-000184-share icon-bg'
                        onClick={() => {
                            client.fnOnChange('activeComponent', ClientSocialMedia)
                            client.fnOnChange('activeIdSubMenu', 1) 
                            client.fnOnChange('title', 'REDES SOCIAIS DO CLIENTE');
                            client.fnOnChange('subTitle', 'Cadastro das redes sociais do cliente');
                            fnResetActiveIndexCompeny()
                        }} 
                    />
                </ButtonSubMenu>
                
                <ButtonSubMenu>                    
                    <IconButton 
                        id={client.idSubMenu[2]}
                        activeId={client.activeIdSubMenu}
                        label='Minhas Empresas' 
                        width='90px'
                        fontSize='18px'
                        className='icon-000301-menu-company icon-bg'
                        onClick={() => {                            
                            client.fnOnChange('activeComponent', ClientCompanyList)
                            client.fnOnChange('activeIdSubMenu', 2);
                            client.fnOnChange('title', 'EMPRESAS');
                            client.fnOnChange('subTitle', 'Lista de Empresas');
                            client.fnOnChange('isOpenClientRegistration', false)
                            fnResetActiveIndexCompeny()
                        }} 
                    />
                </ButtonSubMenu>

                {/************* SUBMENU-EMPRESA SELECIONADA ********************/}
                {
                    client.activeIndexCompany != -1 &&
                    //@ts-ignore
                    client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany]?._id &&
                    <ClientCompanySubMenu />
                }
            </div>            
        </ContainerSubMenu>
    )
}