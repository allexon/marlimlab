import React from 'react'
import { Container, Field, Label, Error, ContainerField } from './styles'
import { InputInvalidSvg, InputValidSvg } from '../../../assets/svg/index'
import { IconFont } from '../../default/index'
import { marlimThemeStore } from '../../../store'

type IInput = {
    id?: string;
    color?: string,    
    border?: string,
    width?: string,
    height?: string,
    className?: string,    
    value?: string,
    type?: string,
    label?: string,
    autoComplete?: string,
    isValidInput?: boolean | null,    
    autoFocus?: boolean | undefined,
    placeholder?: string,
    error?: string,
    required?: boolean,
    disabled?: boolean,    
    maxLength?: number | undefined,    
    pattern?: string,
    title?: string,
    fontFamily?: string | undefined,
    fontSize?: string | undefined,
    icon?: string,
    align?: string,
    bgInput?: string,
    bgLabel?: string,    
    fnOnChange?:  (e: any) => void,
    fnOnPress?: (e?: any) => void,
    fnOnblur?: (e?: any) => void    
}

export const Input = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {    
    
    const marlimTheme1 = marlimThemeStore((state: any) => state)

    return (
        <Container style={{width:props.width, border:props.border, fontFamily:props.fontFamily}}>
            {props.isValidInput == null? '' : props.isValidInput?  <InputValidSvg /> : <InputInvalidSvg />}
            <Label style={{backgroundColor: props.bgLabel? props.bgLabel : 'white' }} color={props.disabled? '#CFCCCB ' : props.color}>{props.label? props.label : ''}</Label>
            
            <ContainerField height={props.height}>
                { props.icon && <IconFont icon={props.icon} />}
                <Field 
                    ref={ref}
                    id={props.id? props.id : `input-${props.label?.toLowerCase()}`}                 
                    className={props.className? props.className : ''}                 
                    onChange={props.fnOnChange}
                    onBlur={(e) => props.fnOnblur ? props.fnOnblur : undefined}
                    value={props.value}
                    type={props.type? props.type : 'text'}
                    autoComplete={props.autoComplete}
                    autoFocus={props.autoFocus}
                    onKeyDown={e => e.key === 'Enter'? props.fnOnPress && props.fnOnPress(e) : undefined}
                    style={{fontSize: props.fontSize, backgroundColor: props.bgInput? props.bgInput : 'white'}}
                    placeholder={props.placeholder}
                    required={props.required? true : false}
                    disabled={props.disabled? true : false}
                    color={props.disabled? '#CFCCCB ' : props.color}
                    title={props.title}
                    maxLength={props.maxLength}
                    align={props.align}
                />
            </ContainerField>
            
            <Error>{props.error? props.error : ''}</Error>
        </Container>
    )
})