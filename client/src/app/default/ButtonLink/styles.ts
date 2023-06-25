import styled from 'styled-components'
import { Link } from 'react-router-dom'

type PropsButton = {    
    align?: string
    width?: string
}

type Propsline = {
    align?: string
    width?: string

}

export const Container = styled.div`
    position: relative;
    display: flex;    
    width: 100%;
    height: 35px;    
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
`

export const Button = styled(Link)<PropsButton>`
    display:flex;
    position: relative;
    color:#A9ABAE;    
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;    
    width: ${res => res.width? res.width : '300px'};
    letter-spacing: 2px;
    justify-content: ${res => res.align? res.align : 'center'};
    align-items: center;
        
    &:hover {
        color: orange;
    }
    
    &:focus{
        color: orange;
    }

    &:active{
        color: white;
    }
`

export const Line = styled.div<Propsline>`    
    position: absolute;    
    display: flex;
    width:100%;
    justify-content: ${res => res.align? res.align : 'center'};

    &::after {
        display: flex;
        position: absolute;
        content: '';
        width: ${res => res.width? res.width : '137px'};
        border-bottom:solid 1px white;        
        bottom:-8px;
    }
`