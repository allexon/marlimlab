import styled from 'styled-components'

type Props = { 
    bg?: string,
    fontFamily?: string    
}

export const Container = styled.div<Props>`
    display:flex; 
    position: relative;
    flex-flow: column nowrap;
    justify-content:center; 
    align-items:stretch;
    width:100%;
    height:45px; 
    border-radius:5px;
    background-color:#08623F;
`

export const Button = styled.button<Props>`
    display:flex; 
    position: relative;
    justify-content:center; 
    align-items: center;
    flex:1;
    height:100%; 
    border-radius:5px;
    font-size:14px;    
    font-family: 'Oswald';
    background-color:#08623F;
    color: white;
    letter-spacing:2px;
    
    &:hover {
        background-color: #1F583E;  
    }
`

export const Icon = styled.i<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    color:white; 
    height: 100%;
    padding: 10px;
    font-size:25px;
`

export const Label = styled.label<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-size:14px;
    height: 100%;
    cursor: pointer;
`