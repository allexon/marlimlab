import React, { lazy } from 'react'
import { Container, Label, Button } from './styles'
import { marlimThemeStore } from '../../../store/index'

type Props = {
    id?: string,
    children?: React.ReactNode,
    icon?: string,
    bg?: string,
    label?: string,
    color?: string,    
    className?: any,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function ButtonMenu( props : Props) {

    const theme = marlimThemeStore(state => state)
    
    return (
        <Container bg={props.bg}>
            <Button
                id={props.id? props.id : 'button-default'}  
                className={props.className? props.className : 'button-enable'}  
                color={props.color} 
                onClick={props.onClick}
            >
                <i className={props.icon} style={{fontSize:'40px', color:'#014058', height:'40px'}}></i>
                <Label fontFamily={theme.fontOswald}>{props.label}</Label>
            </Button>
        </Container>
    )
}