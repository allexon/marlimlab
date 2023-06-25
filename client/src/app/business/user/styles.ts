import styled  from 'styled-components'

type Props = {
    widthLine? : string,
    align?: string,
    containerContentWidth?: string,
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
    display: flex;
    position: relative;
    flex-flow: column wrap;
    justify-content: ${props => props.align?  props.align : 'flex-start' };
    align-items: center;
    width: 100%;
`

export const ContainerTab = styled.div`
    position: absolute;
    display:flex;
    width: 95%;
    top: -30px;
    left: 10px;
    height: 30px;    
`

export const ContainerLogin = styled.div`
    position: relative;
    width: 330px;
    height: 450px;
    justify-content: center;    
    align-items: center;
    background-color: #111111;
    border-radius: 10px;
    margin:20px;
    
    &::after {
        position: absolute;
        content: '';
        width: 340px;
        height: 460px;
        border:solid 2px white;
        z-index:1;
        left:-7px;
        top:-7px;
        border-radius: 10px;
    }
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

export const BoxButton = styled.div`
    display:flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 10px;
    margin-bottom: 5px;
`