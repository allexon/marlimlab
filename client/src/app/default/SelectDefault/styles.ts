import styled from 'styled-components'

type Props = { 
    width?: string
}

export const Main = styled.div<Props>`
    display: flex;
    position: relative;
    flex-flow: row wrap;
    height: 40px;
    margin-top: 10px;    
    width: ${props => props.width? props.width : '100%'};

    input {
        text-transform: uppercase;    
    }
`

export const Container = styled.div`    
    position: absolute;
    z-index: 3;    
    width: 100%;
`

export const Label = styled.label`
    display: flex;
    position: absolute;
    align-items: center;
    height: 20px;
    z-index: 4;
    width: auto;    
    top:-9px;
    left: 5px;
    padding: 3px;
    color:black;
    background-color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
`

