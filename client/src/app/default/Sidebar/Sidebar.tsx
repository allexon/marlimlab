import { useEffect } from 'react'
import { Container, ContainerAba, Button, SvgAba, SvgArrow }from './styles'
import { layoutStore, marlimThemeStore } from '../../../store/index'


type Props = { 
    abaWidth?: string,
    marginLeft?: string,
    position?: string;    
    top?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    children: JSX.Element,
    rotate?: string
}

export default function Sidebar(props : Props) {

    const layout = layoutStore(state => state)
    const marlimTheme1 = marlimThemeStore(state => state)

    const fnResetLayout = () => {        
        layout.fnOnChangeLayout('isOpenSidebar',  layout.isOpenSidebar? false : true) 
    }
    
    const fnOpenCloseSidebar = (e : any) => {
        e.preventDefault()        
        fnResetLayout()
    }
    
    return (        
        <Container left={layout.isOpenSidebar? layout.sidebarleftOpen : layout.sidebarLeftClose} width={layout.sidebarWidth} bg={marlimTheme1.sidebarBg}>
            <ContainerAba>
                <button onClick={(e) => fnOpenCloseSidebar(e)} style={{margin:'0px', padding:'0px',  width:'100%', backgroundColor:'transparent'}}>
                    <div style={{position:'absolute', top:'20px', left:'-20px'}}>
                        <SvgAba viewBox="0 0 14.817 72.013" preserveAspectRatio="none">
                            <g transform="translate(-60.697 -66.271)">
                                <path fill={marlimTheme1.sidebarBg} d="m60.697 66.271c2.7862 3.9516 14.817 10.168 14.817 23.426v25.16c0 13.258-12.03 19.475-14.817 23.426z" fillRule="evenodd"/>
                            </g>
                        </SvgAba>
                    </div>
                    
                    <div style={{position:'absolute', top:'20px', left:'20px'}}>
                        <SvgArrow className={layout.isOpenSidebar? 'cento-graus' : ''} viewBox="0 0 3.3911 10.834" preserveAspectRatio="none">
                            <g transform="translate(-64.141 -106.13)">
                                <path fill="#74251f" d="m65.321 111.54 2.2107 5.2171-0.46014 0.19989-2.9309-5.417 2.9309-5.417 0.46014 0.19989z" fillRule="evenodd"/>
                            </g>
                        </SvgArrow>
                    </div>
                </button>
            </ContainerAba>
            {props.children}
        </Container>
    )
}


