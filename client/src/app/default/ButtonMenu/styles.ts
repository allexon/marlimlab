import styled from 'styled-components'

type Props = { 
    bg?: string,
    fontFamily?: string    
}

export const Container = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 70px;
    margin:3px;
`

export const Button = styled.button<Props>`
    display: flex;
    position: relative;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.bg? props.bg : 'transparent'};
    cursor:pointer;
    
    &:hover {
        color:white;
    }
`

export const Label = styled.label<Props>`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    width: 100%;
    font-size: 12px;
    font-family: ${props => props.fontFamily};
    text-align: center;
`