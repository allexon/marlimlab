import { useEffect, useState } from 'react'
import { Container, Label, ContainerCheck, Check, IsCheck, Circle  } from './styles'
import { clientStore } from '../../../store/index'

type Props = {    
    name?: string,
    label?: string,
    disabled?: boolean,
    stroke?: string,
    checked?: boolean,
    onChange: (e?: any) => void,
}

export default function Checkbox(props : Props) {

    const client = clientStore(state => state)
    
    return (
        <Container>                
            <ContainerCheck>
                <Circle />
                <Check                    
                    type='checkbox'
                    disabled={props.disabled}
                    name={props.name}                    
                    onChange={props.onChange}
                    checked={props.checked}
                />                    
                {props.checked && <IsCheck>&#10003;</IsCheck>}
            </ContainerCheck>
            <Label>
                {props?.label}
            </Label>
        </Container>
    )
}