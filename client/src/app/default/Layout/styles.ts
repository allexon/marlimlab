import styled from 'styled-components'

type Props = { 
    height?: string,    
    children?: React.ReactNode,
    bg?: string,
}

export const Main = styled.div<Props>`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    flex:1;
`

export const ContainerLayout = styled.div<Props>`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;    
    background-color: #E3F1E7;
`

export const Header = styled.div<Props>`
    position: relative;
    background-color: #226387;
    width: 100%;
    height: 70px;
`

export const Content = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex:1;
    overflow: hidden;
`

export const Footer = styled.div<Props>`
    position: relative;
    background-color: #226387;
    width: 100%;
    height: 44px;    
`