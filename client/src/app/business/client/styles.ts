import styled from 'styled-components'

type Props = {
    containerContentWidth?: string,
    id?: number,
    activeId?: number,
    align?: string,
    bottom?: string,
    fontFamily?: string,
    fontSize?: string,
    className?: string,
    label?: string,
    width?: string,
    radius?: string,
    position?: string,
    activeAddress?: boolean,
    totalRegister?: number
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

export const ButtonOpenCardAddress = styled.div<Props>`
    display:flex; 
    position: relative;
    justify-content:center; 
    align-items:center; 
    margin:10px; 
    width:300px;  
    border-radius:5px; 
    line-height:45px; 
    font-size:14px;    
    font-family: 'Oswald';
    background-color:#08623F;    
    color: white;
    letter-spacing:2px;
    cursor: pointer;
`

export const ContainerButtonTrash = styled.div<Props>`
    display: flex;
    opacity: 0;
    position: absolute;
    justify-content: center;
    align-items: center;
    bottom: 5px;
    left:10px;
    cursor: pointer;
    z-index: 4;
`

export const TextTooltipTrash = styled.div<Props>`
    display: flex;
    opacity: 0;
    flex-flow: column nowrap;
    position: absolute;
    top: -25px;
    color: white;
    font-size: 10px;
    //z-index: 10 !important;
    width: 100px;
    line-height: 20px;
    background-color: gray;
    border-radius: 5px;
    text-align: center;
    transform: rotate(0deg);
`

export const ButtonIconTrash = styled.button<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;    
    color: white;
    width: 23px;
    height: 23px;
    border-radius: 3px;
    
    i {
        color: white;
    }
`

export const ContainerBox = styled.div<Props>`
    display:flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20px;
    background-color: white;    
    color:black;
`

export const TextBox = styled.span<Props>`
    display:flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 40px;
    background-color: white;    
    color:black;
    top:-25px;
    border-radius: 40px;
    font-family: ${props => props.fontFamily? props.fontFamily : 'Arial'};
    font-size: 13px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;
`

export const ContainerLocal = styled.div<Props>`
    display: flex;
    position: absolute;
    right: -50px;
    top: -300px;
    z-index:10;
`

export const ContainerCheckbox = styled.div<Props>`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 70%;
`

export const ContainerCard = styled.div<Props>`
    display:flex;
    flex-flow:row wrap;    
    position:relative;
    width:100%;
    justify-content:center;
    align-items:center;
    box-shadow:rgba(0, 0, 0, 0.2) 0px 0px 7px 2px;
    border:solid 1px #C0C0C0;
    margin-top: 10px;
    margin-bottom: 5px;
`

export const MapAddress = styled.div<Props>`
    display:flex;
    position: relative;
    justify-content: center;
    background-color:white;    
    border-radius:5px;
    width:100%;
    cursor: ${props => props.activeAddress? 'default' : 'pointer'};
    color:black;
    padding: 3px;


    &.map-0 {        
        border-bottom: ${props => props.totalRegister && props.totalRegister > 1? 'solid 1px #C0C0C0' : ''};
        margin-bottom: 3px;
        padding-top: 5px;
    }

    &:hover {
        .display-block {
            opacity: 1;
            transform: rotate(-5deg);
            transition: transform 0.2s ease;
        }
    }
`

export const LabelAddress = styled.div<Props>`
    display:block;
    position: absolute;        
    flex-flow: row wrap;
    line-height:20px;
    top:-12px;
    left:5px;        
    background-color: white;
    color: ${props => props.color? props.color : '#282828'};
    font-size: 11px;
    font-family: arial;
    z-index:1;
    margin:0px;
    padding: 0px;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
`

export const TextAddress = styled.p<Props>`
    display: flex;
    width:100%;
    flex-flow: row wrap;    
    margin: 0px;
    padding: 0px;
    font-size: 12px;
    justify-content: center;
    color: black;
    font-family: 'Oswald';

    b {
        color: black;
      }
`

export const IconActiveAddress = styled.div<Props>`
    position: absolute;
    right: 5px;
    bottom: 15px;
    right: -10px;
    font-size: 40px;
    color: #006B3E;
    transform: rotate(15deg);

    &:hover {
        &::after {
            position: absolute;
            background-color: gray;
            width: 200px;
            line-height: 15px;
            padding: 7px;
            color:white;
            border-radius: 5px;
            font-size: 12px;
            transform: rotate(-15deg);
            word-spacing: 4px;
            text-align: justify;
            z-index: 10;
            bottom:-10px;
            left: -200px;            
            content: 'Este endereço está definido como principal, click em outro endereço para trocar!';
        }
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
    //height: 20px;
    align-items: center;
    //padding:3px;

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

export const Draft = styled.label<Props>`
    position: relative;
    display: flex;    
    justify-content: center;
    align-items: center;
    font-size: 18px;
    height: 25px;
    width: 100%;
    color: black;
    text-align: center;
    font-family:inherit;
    font-family: ${props => props.fontFamily? props.fontFamily : 'Arial'};    
    height: 30px;
    width: 100%;
    margin-bottom:3px;
`

//**************************** MY DATA SUB-MENU ********************************/
export const ContainerSubMenu = styled.div<Props>`
    display:flex;
    position: absolute;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;    
    z-index: 10;
    border-radius: 5px;
    background-color: white;
    border:solid 0.15rem #002F4E;
    top:0px;
    left:-55px;
    padding: 3px;
`

export const ButtonSubMenu = styled.button<Props>`
    display: flex;    
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin: 3px;
    padding: 3px;
    background-color: transparent;
    
    &:hover {
        .icon-bg {
            color: ${props => props.id === props.activeId?  'yellow' : ''};            
        }
    } 
`

export const IconButton = styled.i<Props>`
    display: flex;    
    justify-content: center;
    align-items: center;
    position: relative;
    color: ${props => props.id === props.activeId?  'yellow' : 'white'};    
    transform: rotate(0deg);
    font-size:${props => props.fontSize? props.fontSize : '30px'};
    
    &:hover {            
        &::after {
            position: absolute;
            width: ${props => props.width === props.width?  props.width : '140px'};
            line-height: 12px;
            padding:5px;
            color:white;
            font-size: 10px;
            border-radius: 5px;
            background-color: gray;
            content: ${(props : any) => props.label? `'${props.label}'` : ''};
            top: -20px;
            left:15px;            
            opacity: 1;
            transform: rotate(-5deg);
            transition: transform 2 ease;
        }
    }
`

export const ButtonAddCompany = styled.button<Props>`
    color:white;
    width:45px;  
    height:45px;
    border-radius:100%;
    background-color:#08623F;
`

export const ContainerCardCompany = styled.div`
    display:flex; 
    width:100%;
    flex-flow: row wrap;
    padding-top:7px;
    padding-left: 5px;
    justify-content:left;
`

export const CardCompany = styled.button`
    display:flex; 
    overflow:auto;  
    width:130px; 
    height:140px;    
    border-radius:7px; 
    justify-content:flex-start;
    flex-flow:column nowrap; 
    margin:5px;
    background-color: transparent;
    box-shadow:rgba(0, 0, 0, 0.2) 0px 0px 7px 2px;
`

export const ContainerLogo = styled.div`
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
    width:100%;
    padding:5px;
    height:80px;
`

export const Logo = styled.img`
    max-height:100%;
    max-width:120px;
`
export const CompanyName = styled.div<Props>`
    display:flex; 
    flex-flow:row wrap; 
    justify-content:center; 
    align-items: center;
    overflow:hidden;     
    width: 100%;
    height: 64px;
    line-height: 17px;
    font-family: ${props => props.fontFamily? props.fontFamily : 'Arial'};
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

export const Label = styled.span<Props>`
    position: absolute;
    font-size: 14px;
    font-family: 'Oswald';
    top:-47px;
    left:25px;
    color:white;
    letter-spacing: 1px;
`

// ****************************************** STYLES DETALHES ****************************
export const ContainerDetails = styled.div<Props>`
    display:flex;
    flex-flow: row wrap;
    width: 100%;
`

export const ContainerValues = styled.div<Props>`
    display:flex;
    flex-flow: row wrap;
    padding: 10px;    
    max-width: 100%;
`

export const ContainerField = styled.div<Props>`
    display:flex;
    flex-flow: row wrap;
    width: ${props => props.width? props.width : '100vw'};    
    justify-content: ${props => props.align? props.align : 'flex-start'};
    border-bottom: solid 1px gray;
    font-family: 'Oswald';
    font-size: 14px;    

    &.custom-container-field {        
        flex-flow: column wrap;
        align-items: center;
        justify-content: center;
    }

    &.container-field-0, &.container-field-1 {
        border: none;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 7px 3px;
        margin: 5px;
        padding: 10px;
        font-size: 12px;
    }

    &.container-field-0 {
        margin-top: 15px;
        margin-bottom: 10px;
    }
`

export const FieldLabel = styled.span<Props>`
    display:flex;
    flex-flow: row wrap;
    justify-content: ${props => props.align? props.align : 'flex-start'};
    width: ${props => props.width? props.width : 'auto'};    
    font-weight: bold;
    padding-right: 5px;
`

export const FieldValue = styled.span<Props>`
    display:flex;    
    flex-flow: row wrap;    
    //flex:1;
    justify-content: ${props => props.align? props.align : 'flex-start'};    
    padding-right: 5px;
        
    img {
        max-height: 130px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`

export const SubField = styled.p<Props>`
    display:flex;
    flex-flow: row wrap;
    padding-right: 5px;    
    height: 20px;
`

export const SubLabel = styled.span<Props>`
    font-weight: bold;
`

export const SubValue = styled.span<Props>`
    padding-left: 2px;
`

