import styled from 'styled-components'
import { Link } from 'react-router-dom'

type PropsButton = {    
    align?: string
    width?: string
}

export const Container = styled.div`
    position: absolute;
    display: flex;    
    width: 40px;
    height: 40px;
    bottom:17px;
    left:10px;
`

export const Button = styled(Link)<PropsButton>`
    display:flex;
    position: relative;
    color:white;    
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;    
    width: ${res => res.width? res.width : '300px'};
    letter-spacing: 2px;
    justify-content: ${res => res.align? res.align : 'center'};
    align-items: center;
`