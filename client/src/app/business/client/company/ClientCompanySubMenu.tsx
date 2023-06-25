import { ButtonSubMenu, IconButton } from '../styles'
import { clientStore } from '../../../../store/index'
import { ClientCompanyProduct, ClientCompanyRegistration, ClientCompanyDetails, ClientCompanyDeliveryMap, ClientCompanyConfig } from '../index'
import ClientCompanySociaMedia from './ClientCompanySocialMedia'

type Props = {    
    icon?: string,
    id?: number,
    activeId?: number
}

export default function ClientCompanySubMenu(props : Props) {
    
    const client = clientStore(state => state)    
    
    return (
        <>
            <ButtonSubMenu>
                    <IconButton 
                        id={client.idSubMenu[3]}
                        activeId={client.activeIdSubMenu}
                        label='Empresa Detalhes' 
                        width='90px'
                        fontSize='28px'
                        className='icon-000052-clipboard-notes icon-bg'
                        onClick={() => {                            
                            client.fnOnChange('activeComponent', ClientCompanyDetails); 
                            client.fnOnChange('activeIdSubMenu', 3);
                            client.fnOnChange('title', 'EMPRESA DETALHE');
                            client.fnOnChange('subTitle', 'Dados da Empresa');
                            client.fnOnChange('isOpenClientRegistration', false)                            
                        }} 
                    />
            </ButtonSubMenu>

            <ButtonSubMenu>
                <IconButton 
                    id={client.idSubMenu[4]}
                    activeId={client.activeIdSubMenu}
                    label='Empresa Cadastro' 
                    width='90px'
                    fontSize='23px'
                    className='icon-000053-clipboard-pencil icon-bg'
                    onClick={() => {                        
                        client.fnOnChange('activeComponent', ClientCompanyRegistration); 
                        client.fnOnChange('activeIdSubMenu', 4);                            
                        client.fnOnChange('title', 'CADASTRO DA EMPRESA');
                        client.fnOnChange('subTitle', 'Cadastrar/Alterar dados da Empresa');
                        client.fnOnChange('isOpenClientRegistration', false)                        
                    }} 
                />
            </ButtonSubMenu>

            <ButtonSubMenu>
                <IconButton 
                    id={client.idSubMenu[5]}
                    activeId={client.activeIdSubMenu}
                    label='Empresa Redes Sociais' 
                    width='90px'
                    fontSize='23px'
                    className='icon-000092-foot icon-bg'
                    onClick={() => {                        
                        client.fnOnChange('activeComponent', ClientCompanySociaMedia); 
                        client.fnOnChange('activeIdSubMenu', 5);                            
                        client.fnOnChange('title', 'REDES SOCIAIS DA EMPRESA');
                        client.fnOnChange('subTitle', 'Cadastrar/Alterar redes sociais da empresa');
                        client.fnOnChange('isOpenClientRegistration', false)                        
                    }} 
                />
            </ButtonSubMenu>

            <ButtonSubMenu>
                <IconButton 
                    id={client.idSubMenu[6]}
                    activeId={client.activeIdSubMenu}
                    label='Cadastro de Produtos' 
                    width='90px'
                    fontSize='23px'
                    className='icon-000188-shopping-cart'
                    onClick={() => {                        
                        client.fnOnChange('activeComponent', ClientCompanyProduct); 
                        client.fnOnChange('activeIdSubMenu', 6);
                        client.fnOnChange('title', 'LISTA DE PRODUTOS');
                        client.fnOnChange('subTitle', 'Empresa/Produtos');
                        client.fnOnChange('isOpenClientRegistration', false)
                    }} 
                />
            </ButtonSubMenu>

            <ButtonSubMenu>
                <IconButton 
                    id={client.idSubMenu[7]}
                    activeId={client.activeIdSubMenu}
                    label='Mapear Região de atendimento' 
                    width='90px'
                    fontSize='18px'
                    className='icon-000303-map-address'
                    onClick={() => {                        
                        client.fnOnChange('activeComponent', ClientCompanyDeliveryMap); 
                        client.fnOnChange('activeIdSubMenu', 7);
                        client.fnOnChange('title', 'MAPEAR REGIÃO DE ATENDIMENTO');
                        client.fnOnChange('subTitle', 'Adicionar/remover região de atendimento');
                        client.fnOnChange('isOpenClientRegistration', false)
                    }} 
                />
            </ButtonSubMenu>
            
            <ButtonSubMenu>
                <IconButton 
                    id={client.idSubMenu[8]}
                    activeId={client.activeIdSubMenu}
                    label='Empresa Configurações' 
                    width='90px'
                    fontSize='23px'
                    className='icon-000287-widget icon-bg'
                    onClick={() => {                        
                        client.fnOnChange('activeComponent', ClientCompanyConfig); 
                        client.fnOnChange('activeIdSubMenu', 8);
                        client.fnOnChange('title', 'CONFIGURAÇOES GERAIS');
                        client.fnOnChange('subTitle', 'Cadastrar/Alterar configurações da empresa');
                        client.fnOnChange('isOpenClientRegistration', false)                        
                    }} 
                />
            </ButtonSubMenu>
        </>
    )
}