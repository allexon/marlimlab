import React from 'react'
import { Container } from './styles'
import { InputInvalidSvg, InputValidSvg } from '../../../assets/svg/index'

type IInput = {
    id?: string;
    color?: string,
    width?: string,
    className?: string,    
    value?: string,
    type?: string,
    label?: string,
    autoComplete?: string,    
    textTransForm?: string,
    isValidInput?: boolean | null,    
    autoFocus?: boolean | undefined,
    placeholder?: string,
    classNameLabel?:string
    fnOnChange?:  (e: any) => void,
    fnOnPress?: () => void,
}

export const InputLine = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
    return (
        <Container width={props.width} textTransform={props.textTransForm}>
            <>
            {props.isValidInput == null? '' : props.isValidInput?  <InputValidSvg /> : <InputInvalidSvg />}
            {props.label && <label className={props.classNameLabel}>{props.label}</label> }
            <input 
                ref={ref}
                id={props.id? props.id : `input-${props.label?.toLowerCase()}`}                 
                className={props.className? props.className : ''} 
                color={props.color}                 
                onChange={props.fnOnChange}
                value={props.value}
                type={props.type? props.type : 'text'}
                autoComplete={props.autoComplete}
                autoFocus={props.autoFocus}
                onKeyDown={e => e.key === 'Enter'? props.fnOnPress && props.fnOnPress() : undefined}
                placeholder={props.placeholder}
            />
            </>
        </Container>
    )
})