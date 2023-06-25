import styled from 'styled-components'

type Props = { 
    bg?: string,
    color?: string
    fontSize?: string
}

export const Container = styled.div<Props>`
    display:flex;
    position: relative;    
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 15px;    
    height: 35px;
    margin-left: 3px;
`

export const Icon = styled.i<Props>`
    display:flex;    
    font-family: 'Courier New', Courier, monospace;
    font-size: ${props => props.fontSize? props.fontSize : '20px'};
    color: ${props => props.color? props.color : '#D3D3D3'};
`