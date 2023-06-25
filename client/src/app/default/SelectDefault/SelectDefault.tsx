import React, { useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select'
import { Main, Container, Label } from './styles'

type ISelect = {
    id?: string,
    label?: any,
    options?: any[],
    width?: string,
    value?: any,
    defaultValue?: any,    
    isClearable?: boolean,
    isMulti?: boolean,
    className?: string,
    fnOnChange?:  (e: any) => void,
    fnOnPress?: (e?: any) => void
}

export const SelectDefault = React.forwardRef<HTMLInputElement, ISelect>((props, ref) => {

    return (
        <Main width={props.width}>
            {
                props.label &&
                <Label>{props.label}</Label>
            }
            <Container>
                <Select
                    className={props.className}
                    id={props.id}                    
                    options={props.options}
                    placeholder=''
                    isClearable={props.isClearable}
                    isMulti={props.isMulti}
                    onChange={props.fnOnChange}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'} 
                    styles={{                        
                        menuPortal: provided => ({ ...provided, zIndex: 9999, fontFamily:'Oswald', fontSize: '14px'}),
                        menu: provided => ({ ...provided, zIndex: 9999 }),
                        control: (baseStyles, state) => ({...baseStyles, color:'black', fontFamily:'Oswald', fontSize: '14px'}),
                        option: (baseStyles, state) => ({...baseStyles, color:'black', fontFamily:'Oswald', fontSize: '14px'}),
                        
                    }}
                />
            </Container>
        </Main>
    )
})