import React from 'react'
import { Container } from './styles'

type Props = {
    id?: string;
    children : React.ReactNode,
    bg?: string,
    height?: string,
    width?: string,
    color?: string,    
    className?: any,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function Button( props : Props ) {
    return (
        <Container bg={props.bg} height={props.height} width={props.width} >
            <button 
                id={props.id? props.id : 'button-default'} 
                className={props.className? props.className : 'button-enable'} 
                color={props.color} 
                style={{height:props.height}}
                onClick={props.onClick}                
            >
                {props.children}
            </button>
        </Container>
    )
}