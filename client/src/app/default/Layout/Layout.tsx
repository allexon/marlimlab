import {Main, ContainerLayout, Header, Content, Footer} from './styles'
import Sidebar from '../Sidebar/Sidebar'
import Menu from '../../business/menu/Menu'
import { layoutStore, loginStore } from '../../../store/index'
import { SidebarContext } from '../../default/index'

type Props = {
    height?: string,
    width?: string,
    children: React.ReactNode
}

export default function Layout(props: Props) {

    const layout = layoutStore(state => state)
    const SidebarComponent = layout.sidebarContextComponent;
    const login = loginStore(state => state)
    
    return (
        <Main>
            <Sidebar>
                <Menu />
            </Sidebar>

            <ContainerLayout>
                <Header>
                </Header>
                
                <Content>
                    {
                        layout.isVisibleSidebarContext &&
                        <SidebarContext>
                            {SidebarComponent ? <SidebarComponent /> : <></>}
                        </SidebarContext>
                    }

                    <div style={{display:'flex', minWidth:'100%',  height:'100%', paddingTop:'30px', overflow:'hidden'}}>
                        {props.children}
                    </div>
                    
                </Content>

                <Footer>
                    <span>Rodapé</span>
                </Footer>
            </ContainerLayout>
        </Main>
    )
}