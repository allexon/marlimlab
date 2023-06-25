import styled from 'styled-components'

type Props = { 
    bg?: string,
    width?: string,
    height?: string,
    textTransform?: string,
    color?:string,
    border?:string,
    fontFamily?:string,
    fontSize?:string,
    marginLeft?: string,
    align?: string
}

export const Container = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    width: ${props => props.width? props.width : '100%'};
    line-height: 35px;
    border: ${props => props.border? props.border : 'solid 1px #C0C0C0'}; ;    
    border-radius: 3px;    
    margin: 3px;
    margin-top:10px;
    font-family: ${props => props.fontFamily? props.fontFamily : 'Arial'};
    font-family:inherit;
`
export const ContainerField = styled.div<Props>`
    display:flex;    
    width: 100%;
    height: ${props => props.height? props.height : '35px'};
    padding-left: 3px;
    //border:solid 1px orange;
`

export const Field = styled.input<Props>`
    width: 100%;
    height: 100%;
    background-color: white;
    color: ${props => props.color? props.color : 'black'};
    font-size: ${props => props.fontSize? props.fontSize : '14px'};
    letter-spacing: 0.5px;    
    padding-left: 5px;
    padding-right: 5px;
    text-align: ${props => props.align? props.align : 'left'};
    letter-spacing: 1px;
    
    &:focus {            
        outline: none;
    }
`

export const Label = styled.label<Props>`
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
    z-index:0;
    margin:0px;
    padding: 0px;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
`

export const Error = styled.label<Props>`
    display:block;
    position: absolute;        
    flex-flow: row wrap;
    line-height:20px;
    font-size: 9px;
    width: 100%;    
    //border:solid 1px red;
    height: 10px;
    color:red;
    left: 0px;
    bottom:-10px;
`

