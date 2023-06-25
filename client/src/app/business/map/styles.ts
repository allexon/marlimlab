import styled  from 'styled-components'

type Props = {
    widthLine? : string,
    align?: string,
    position?: string,    
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
    display: flex;
    position: relative;
    flex-flow: column wrap;
    justify-content: ${props => props.align?  props.align : 'flex-start' };
    align-items: center;
    width: 100%;
`

export const ContainerRegistration = styled.div<Props>`
    display: flex;
    position: relative;
    flex-flow: row wrap;
    width: 100%;
    padding: 10px;
`

//***** CSS LIST **********************
export const ContainerList = styled.div`
    position: relative;
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
    align-items: center;
    
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

export const ContainerButtonAdd = styled.div`
    position: absolute;
    bottom: 100px;
    right: 10px;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background-color: #08623F;
`

export const ButtonAdd = styled.button`
    background-color: transparent;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    color:white;
    font-size: 25px;
`

export const Item = styled.span`
    display: block;
    line-height: 14px;
    width: 100%;
    margin-top: 4px;
    margin-bottom: 4px;
`

export const ContainerButtons = styled.div<Props>`
    display:flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
    justify-content: ${props => props.align? props.align : 'baseline'};
    margin-top: 10px;
    margin-bottom: 5px;
`