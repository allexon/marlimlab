import { CardCompany, ContainerLogo, Logo, CompanyName, ContainerCardCompany, ContainerButtons } from '../styles'
import { clientStore, marlimThemeStore } from '../../../../store/index'
import { ButtonIcon } from '../../../default/index'
import { useClient } from '../../../../hooks'
import { ClientCompanyRegistration, ClientCompanyDetails } from '../index'

export default function ClientCompanyList() {
    
    const client = clientStore(state => state)
    
    const theme = marlimThemeStore(state => state)

    const { fnOnChangeClientDataRegister } = useClient()

    const fnAddCompany = () => {
        let _CLIENTE_EMPRESAS = client.dataRegister[0].CLIENTE_EMPRESAS
        let _activeIndexCompany = _CLIENTE_EMPRESAS.length

        // //  // O Campo indice só vai existir em quanto estiver em modo de inserção
        let _obj = {            
            RAZAO_SOCIAL: '',
            CNPJ: '',
            NOME_FANTASIA: '',
            INSCRICAO_ESTADUAL: '',
            CATEGORY: null,
            EXPEDIENTE: null,
            RECEBER_PEDIDO: null,
            IMG_LOGO: undefined,
            YOUTUBE_EMPRESA: '',
            INSTAGRAM_EMPRESA: '',
            FACEBOOK_EMPRESA: '',
            LINKEDIN_EMPRESA: '',
            TWITTER_EMPRESA: '',
            TELEFONE_FIXO_EMPRESA: '',
            CELULAR_WHATZAPP_EMPRESA: '',
            EMAIL_EMPRESA: '',
            ENDERECOS_EMPRESA: [],
        }
        _CLIENTE_EMPRESAS.push(_obj)        
        fnOnChangeClientDataRegister('CLIENTE_EMPRESAS', _CLIENTE_EMPRESAS)        
        client.fnOnChange('activeIndexCompany', _activeIndexCompany)
        client.fnOnChange('isOpenClientRegistration', true)
    }

    const fnEditCompany = (i : number) => {
        let _client = client.list
        const _activeClient = {..._client[i]}        
        let _activeClientCompany = _activeClient.CLIENTE_EMPRESAS[i]
        //@ts-ignore
        let _filter = _activeClientCompany.ENDERECOS_EMPRESA.filter(res => res._id)
        _activeClientCompany.ENDERECOS_EMPRESA = _filter
        client.fnOnChange('activeIndexCompany', i)
        client.fnOnChange('activeComponent', ClientCompanyDetails)
        client.fnOnChange('activeIdSubMenu', 3);
        client.fnOnChange('title', 'EMPRESA DETALHE');
        client.fnOnChange('subTitle', 'Ficha da Empresa');
        client.fnOnChange('isOpenClientRegistration', true)
    }

    return (
     <div style={{width:'100%'}}>
        {
            client.isOpenClientRegistration &&
            <ClientCompanyRegistration />
        }

        <ContainerCardCompany>
            {
                !client.isOpenClientRegistration &&            
                client.dataRegister[0].CLIENTE_EMPRESAS.length > 0 &&
                //@ts-ignore
                // client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany]._id &&
                client.dataRegister[0].CLIENTE_EMPRESAS.map((res : any, i) => {
                        if(res._id) {
                            return (
                                <CardCompany key={i} onClick={() => fnEditCompany(i)}>
                                    <ContainerLogo style={{position:'relative'}}>
                                        {
                                            res.IMG_LOGO?
                                            <Logo src={res.IMG_LOGO} alt='logo' /> :
                                            <i className='icon-000160-photo' style={{display:'flex', position:'absolute', alignItems:'center', bottom:'10px', fontSize:'60px', color:'#002F4E'}} />
                                        }                            
                                    </ContainerLogo>
                                    <CompanyName fontFamily={theme.fontOswald}>
                                        {res.NOME_FANTASIA.length > 47? `${res.NOME_FANTASIA.substring(0, 46)}...` : res.NOME_FANTASIA}
                                    </CompanyName>
                                </CardCompany>
                            )
                        } // END IF _ID
                    })
            }
        </ContainerCardCompany>
        {
            !client.isOpenClientRegistration &&
            <ContainerButtons style={{justifyContent:'center'}}>
                <ButtonIcon  icon='icon-000301-menu-company'  label='ADICIONAR NOVA EMPRESA' onClick={() => fnAddCompany()} />
            </ContainerButtons>
            
        }
     </div>
    )
}