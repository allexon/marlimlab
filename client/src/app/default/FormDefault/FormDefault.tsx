import React, { useState } from 'react'
import { Container } from './styles'

type Props = {
    children: React.ReactNode,
    align?: string
}
    
export default function FormDefault( props : Props ) {
    
    return (
        <Container align={props.align}>
            {props.children}
        </Container>
    )
}