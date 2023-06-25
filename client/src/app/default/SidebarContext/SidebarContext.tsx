import { Container, ContainerAba, SvgAba, SvgArrow, ContainerSidebarContext }from './styles'
import { menuStore, layoutStore, marlimThemeStore } from '../../../store/index'

type Props = { 
    abaWidth?: string,
    marginLeft?: string,
    position?: string;    
    top?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    children: JSX.Element,
    rotate?: string,
}

export default function SidebarContext(props : Props) {

    const layout = layoutStore(state => state)
    const marlimTheme1 = marlimThemeStore(state => state)
    const menu = menuStore(state => state)
    
    const fnOpenCloseSidebarContent = (e : any) => {
        e.preventDefault()
        layout.fnOnChangeLayout('isOpenSidebarContext',  layout.isOpenSidebarContext? false : true)
    }
    
    return (        
        <Container isOpen={layout.isOpenSidebarContext} width={layout.sidebarContextWidth}>
            <ContainerSidebarContext bg={marlimTheme1.sidebarContextBg}>
                <div style={{display:'flex', width:'100%', backgroundColor:'orange', height:'80px', borderRadius:'0px 10px 0px 0px', justifyContent:'center', alignItems:'center'}}>
                    <span style={{color:'white', fontFamily:marlimTheme1.fontOswald, fontSize:'20px'}}>{menu.TITULO_SIDEBAR_CONTEXT}</span>
                </div>

                <ContainerAba style={{backgroundColor:'yellow'}}>
                    <button onClick={(e) => fnOpenCloseSidebarContent(e)} style={{margin:'0px', padding:'0px',  width:'100%', backgroundColor:'transparent'}}>
                        <div style={{position:'absolute', top:'20px', left:'-20px'}}>
                            <SvgAba viewBox="0 0 14.817 72.013" preserveAspectRatio="none">
                                <g transform="translate(-60.697 -66.271)">
                                    <path d="m60.697 66.271c2.7862 3.9516 14.817 10.168 14.817 23.426v25.16c0 13.258-12.03 19.475-14.817 23.426z" fill="#fff" fillRule="evenodd" />
                                </g>
                            </SvgAba>
                        </div>
                        
                        <div style={{position:'absolute', top:'20px', left:'20px'}}>
                            <SvgArrow className={layout.isOpenSidebarContext? 'cento-graus' : ''} viewBox="0 0 3.3911 10.834" preserveAspectRatio="none">
                                <g transform="translate(-64.141 -106.13)">
                                    <path d="m65.321 111.54 2.2107 5.2171-0.46014 0.19989-2.9309-5.417 2.9309-5.417 0.46014 0.19989z" fill="#74251f" fillRule="evenodd"/>
                                </g>
                            </SvgArrow>
                        </div>
                    </button>
                </ContainerAba>
                
                {props.children}
            </ContainerSidebarContext>
        </Container>
    )
}


