import React from 'react';
import { Container, Icon } from './styles'

type Props = {
    id?: string,
    icon?: string,
    color?: string,
    fontSize?: string,
    className?: any,
}

export default function IconFont( props : Props ) {    
    return (
        <Container>
            <Icon color={props.color} className={`icon-${props.icon}`} fontSize={props.fontSize} />
        </Container>
    )
}