import styled from 'styled-components'

type Props = { 
    bg?: string,
    width?: string,
}

export const Container = styled.div<Props>`
    display:flex;
    position: relative;    
    height: 45px;
    background-color: transparent;
`

export const Button = styled.button<Props>`
    display:flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: ${props => props.width? props.width : '150px'};
    height: 40px;
    background-color: ${props => props.bg? props.bg : 'gray'};    
    color:black;
    padding: 3px;
    margin:2px;
    font-size: 14px;
    font-family: 'Oswald';
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;
    border-radius: 3px;
`

export const Icon = styled.i<Props>`
    position:absolute; 
    left:5px; 
    top:0px; 
    font-size:20px; 
    font-weight:normal; 
    padding:5px; 
    color:white;
`

export const Label = styled.span<Props>`
    letter-spacing:3px;
    font-size:15px;
    color:white;
    padding-left: 12px;
`