import styled from 'styled-components'

export const Container = styled.div`    
    position: relative;
    display:flex;    
    flex-flow: row nowrap;
    //border:solid 1px red;
`
export const Label = styled.label`    
    display:flex;    
    flex-flow: row wrap;    
    padding-left:10px;
    padding-right: 10px;
    align-items:center;    
    font-size: 0.9em;
    color:black;
`

export const ContainerCheck = styled.div`    
    display:flex;
    position: relative;    
    flex-flow: column nowrap;
    //background-color: gray;
    width:35px;
    height:35px;
`

export const Check = styled.input`
    position: absolute;
    position: relative;
    display:flex;
    width: 100%;
    height: 100%;
    z-index:3;
    opacity: 0;
    cursor: pointer;
    justify-content:center;
    align-items:center;
 
`

export const Circle = styled.div`
    position: absolute;    
    width: 100%;
    height: 100%;
    border:solid 1px black;
    border-radius: 50px;
    z-index: 1;
`

export const IsCheck = styled.i`
    display: flex;
    position: absolute;
    color:green;
    font-size: 45px;
    font-family: Arial, Helvetica, sans-serif;
    z-index: 2;
    top:-1px;
    left:5px;
`

