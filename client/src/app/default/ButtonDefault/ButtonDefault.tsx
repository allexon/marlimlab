import React from 'react'
import { Container, Button, Icon, Label } from './styles'

type Props = {
    id?: string;
    //children : React.ReactNode,
    bg?: string,
    color?: string,    
    className?: any,
    label?: string,
    icon?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

//icon-000022-arrow-left

export default function ButtonDefault( props : Props ) {
    return (
        <Container>
            <Button id={props.id? props.id : 'button-default'} className={props.className? props.className : 'button-enable'} bg={props.bg} onClick={props.onClick}>
                <Icon className={props.icon} />
                <Label>{props.label}</Label>
            </Button>
        </Container>
    )
}