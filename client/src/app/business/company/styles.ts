import styled  from 'styled-components'


type Props = {
    widthLine? : string,
    align?: string,
    containerContentWidth?: string    
}

export const Main = styled.div`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100%;    
    background-color: transparent; //#fff;
`

export const Container = styled.div<Props>`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    max-width: 630px;
    max-height: 450px;
`

//***** CSS LIST **********************
export const ContainerList = styled.div`
    display:flex;
    flex-flow: column nowrap;   
    align-self: center;    
    background-color: transparent;
    width: 100%;
    height: 100%;
`

export const ContainerItem = styled.div`
    display:flex;
    flex-flow: row nowrap;   
    align-self: flex-start;
    border-bottom:solid 1px #FECE8F;
    width: 100%;
    height: 20px;
    align-items: center;
    padding:3px;

    &:hover {        
        background-color: orange;
        cursor:pointer;
        
        span {
            color:#fff;
        }
    }

    span {
        font-size: 10px;
        font-family: Arial, Helvetica, sans-serif;
        padding-left: 7px;
        color:black;
    }
`

export const ContainerAvatar = styled.div`
    display:flex;
    flex-flow: row nowrap;   
    align-self: flex-start;
    width: 15px;
    height: 15px;
    margin:-1px;

    img {
        width: 100%;
        height: auto;
    }
`

