import { useEffect } from 'react'
import { LogoMarlimLabSvg } from '../../../assets/svg/index'
import { Container, MenuHeader, MenuContent, MenuFooter, ContainerItems, Title } from './styles'
import { ButtonMenu } from '../../default/index'
import { useNavigate }  from 'react-router-dom'
import { menuStore, layoutStore, marlimThemeStore, clientStore, mapStore, addressStore, gasStore } from '../../../store/index'
import { useClient } from '../../../hooks'

import { socket } from '../../../functions/index'

export default function Menu() {

    const { fnGetClientLogado } = useClient()

    const menu = menuStore(state => state)
    const layout = layoutStore(state => state)
    const marlimTheme1 = marlimThemeStore(state => state)
    const client = clientStore(state => state)
    const address = addressStore(state => state)
    const gas = gasStore(state => state)    
    const map = mapStore(state => state)    
    const useMavigate = useNavigate()


    useEffect(() => {
        fnGetMenuList()
        return () => {
            socket.off(menu.IO_MENU_LIST)
        }
    }, [menu.data.length == 0])

    // Aqui Eu Monto todos Links do Menu
    const fnGetMenuList = async () => {        
        socket.emit(menu.IO_MENU_LIST, '')        
        socket.on(menu.IO_MENU_LIST, (data : any) => {
            let _data: any[]
            _data = []
            let _obj : any
            data.map((res : any) => {
                _obj = {
                    MENU_ID: res.MENU_ID, 
                    MENU_NOME: res.MENU_NOME,                    
                    MENU_DESCRICAO: res.MENU_DESCRICAO,
                    TITULO_SIDEBAR_CONTEXT: res.TITULO_SIDEBAR_CONTEXT, 
                    fnRouter: () => fnSidebar(`${res.MENU_ROTA}`, res.MENU_ROTA_INDICE, res.MENU_DESCRICAO),
                    fnReset: () => fnReset(),
                    MENU_ICONE_DESCRICAO: res.MENU_ICONE_DESCRICAO
                }
                _data.push(_obj)
            })            
            menu.fnOnChangeMenu('data', _data)
        })
    }

    const fnReset = () => {
        client.fnReset()        
        address.fnResetAddress()
        layout.fnResetLayout()
    }

    const fnSidebar = (page: string, i:number, description : string) => {
        layout.fnOnChangeLayout('sidebarOpen', true)
        layout.fnOnChangeLayout('activeItemMenu', description)
        fnSidebarContext(page, i, description)
        useMavigate(page)        
    }

    const fnSidebarContext = (page: string, i:number, description : string) => {        
        layout.fnOnChangeLayout('isOpenSidebarContext',  layout.isOpenSidebarContext? false : true)

        // active Item Menu
        //layout.fnOnChangeLayout('activeIconMenu', items[indice].icon)
        layout.fnOnChangeLayout('activeItemMenu', description)
        useMavigate(page)
    }

    const fnMyData = ()  => {        
        client.fnOnChange('typeAddress', 'PF')        
        fnGetClientLogado()
    }

    const fnProduct = ()  => {
        gas.fnOnChangeGasProduct('isVisibleForm', false)        
        // client.fnOnChange('typeAddress', 'PF')
        // fnGetClientLogado()
    }

    const fnMapRoutes = ()  => {
        map.fnOnChangeMap('mapRoutes', [])
    }
  return  (
    <Container>
        <MenuHeader menuHeaderBg={marlimTheme1.menuHeaderBg}>
            <LogoMarlimLabSvg />
            <Title>Painel <br />Adminstrativo</Title>
        </MenuHeader>

        <MenuContent>
            <ContainerItems>                
            {
                menu.data.length > 0 &&
                menu.data.map((res : any, i) => {
                    return (
                        <ButtonMenu                            
                            icon={res.MENU_ICONE_DESCRICAO}
                            label={res.MENU_NOME}
                            key={i} 
                            onClick={() => {
                              res.fnRouter();
                              layout.fnOnChangeLayout('isOpenSidebarContext',  layout.isOpenSidebarContext? false : true)                              
                              menu.fnOnChangeMenu('TITULO_SIDEBAR_CONTEXT', res.TITULO_SIDEBAR_CONTEXT);
                              layout.fnOnChangeLayout('isVisibleForm', false);
                              layout.fnOnChangeLayout('isVisibleSidebarContext', true)
                              res.MENU_ID == 2 && fnMyData() // MEUS DADOS
                              res.MENU_ID == 7 && fnProduct() // PRODUTOS
                              res.MENU_ID == 8 && fnMapRoutes() // MAPA DE ENDEREÇOS DE ATENDIMENTO
                            }}
                        />
                     )
                })
            }
            </ContainerItems>
        </MenuContent>

        <MenuFooter menuFooterBg={marlimTheme1.menuFooterBg}>
            <span>Menu Rodapé</span>
        </MenuFooter>

    </Container>
  )
}