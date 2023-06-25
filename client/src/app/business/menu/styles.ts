import styled from 'styled-components'

type Props = {
    menuHeaderBg?: string,
    menuFooterBg?: string
}


export const Container = styled.div`
    display:flex;
    flex-flow: column nowrap;   
    align-self: flex-start;    
    background-color: transparent;
    width: 100%;
    height: 100vh;
`

export const MenuHeader = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: column wrap;   
    justify-content: center;
    align-items: stretch;
    background-color: ${props => props.menuHeaderBg};
    width: 100%;
    height: 80px;
`

export const Title = styled.div`
    display:flex;
    flex-flow: row wrap;
    font-size: 100%;
    letter-spacing: 1px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    width: 100%;
    margin-left: 75px;
    font-size: 18px;
    color:white;
`

export const MenuContent = styled.div`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    background-color: transparent;
    width: 100%;
    height: 100%;
    margin-left: 3px;
`

export const ContainerItems = styled.div`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    align-self: flex-start;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: #74251f;
`

export const MenuFooter = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: column wrap;   
    justify-content: center;
    align-items: center;    
    background-color: ${props => props.menuFooterBg};
    width: 100%;
    height: 50px;    
`