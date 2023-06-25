import styled, { keyframes } from 'styled-components'
import { animaOff, bounceIn } from '../../assets/css/animations'

export const Container = styled.div`
    position: relative;
    display:flex;
    position:relative;
    flex-flow: row wrap;
    height: 40px;
    width: 100px;
    border: solid 1px #CFCCCB;
    padding: 3px;
    margin-top: 10px;
    margin-bottom: 5px;
`

export const Sellect = styled.div`
    position: absolute;
    width: 98%;
    height: 80%;
    outline: none;
    border:none;
    z-index: 2;
`

export const Label = styled.label`
    position: absolute;
    top:-14px;
    left:10px;
    background-color: white;
    color:black;
    padding:2px;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    z-index: 3;
`

export const Value = styled.span`
    display:flex;
    color:black;
    border:solid 1px blue;
    line-height: 30px;
    padding-left: 5px;
`

export const ButtonClear = styled.button`
    position: absolute;    
    display:flex;
    justify-content: center;
    align-items: center;
    height: 33px;
    width: 10px;;
    color:blue;
    font-size: 17px;
    top:0px;
    right: 28px;
    background-color: transparent;
    //border:solid 1px pink;
`

export const Divider = styled.i`    
    position: absolute;
    display:flex;    
    border-left: solid 0.01em blue;
    height: 25px;    
    right: 22px;
    top: 3px;
`

export const ButtonArrow = styled.button`    
    position: absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;    
    height: 30px;
    width: 20px;
    bottom:0px;
    right: 1px;
    background-color: transparent;
    color: white;
    //border:solid 1px red;

    &::after {
        line-height: 30px;
        text-align: center;
        font-size: 15px;
        color:blue;
        content: '⏴';
        transform: rotate(-90deg);
    }
`

export const DisplayList = styled.div`
    position: absolute;
    display:flex;
    flex-flow: row wrap;
    width: 100%;
    background-color: orange;
    top:40px;
    left:0px;
    z-index: 3;
`

export const List = styled.ul`
    border:solid 1px red;
    width: 100%;
`

export const RowList = styled.li`    
    line-height: 30px;
    margin:3px;
    text-align: left;
    border:solid 1px pink;
    color:black;
    list-style-type: none;
    background-color: white;
`




