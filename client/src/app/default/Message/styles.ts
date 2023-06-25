import styled, { keyframes } from 'styled-components'
import { animaOff, bounceIn } from '../../../assets/css/animations'

export const Main = styled.div`
  position: absolute;
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Container = styled.div`
  position:fixed;  
  display:flex;
  flex-flow: row nowrap;
  width: 400px;  
  border-radius: 3px;  
  height: 60px;
  pointer-events: none;
  overflow: hidden;
  border-radius: 3px;  
  color: ${props => props.color? props.color : 'black'};
  font-family: Arial;
  justify-content:center;
  align-items:center;
  z-index:10002;
  border:solid 2px transparent;  
  bottom: 0px;
    
  &.success-up {
    background-color: yellowgreen;
    box-shadow: 0 0 12px white;    
    animation-name: ${bounceIn};
    animation-duration: 0.9s;    
    bottom: 50px;
  }

  &.success-down {
    background-color: yellowgreen;
    box-shadow: 0 0 12px white;    
    animation-name: ${animaOff};
    animation-duration: 0.9s;    
    bottom: -115px;
  }

  &.error-up {
    background-color: tomato;
    box-shadow: 0 0 12px white;    
    animation-name: ${bounceIn};
    animation-duration: 0.9s;    
    bottom: 50px;
  }

  &.error-down {
    background-color: tomato;
    box-shadow: 0 0 12px white;
    animation-name: ${animaOff};
    animation-duration: 0.9s;    
    bottom: -115px;
  }

  &.info-up {
    background-color: #ffc40c;
    box-shadow: 0 0 12px white;    
    animation-name: ${bounceIn};
    animation-duration: 0.9s;    
    bottom: 50px;
  }

  &.info-down {
    background-color: #ffc40c;
    box-shadow: 0 0 12px white;
    animation-name: ${animaOff};
    animation-duration: 0.9s;    
    bottom: -115px;
  }
`

export const Text = styled.span` 
  position:absolute;
  display:flex;  
  flex-flow:row wrap;
  width:100%;
  align-self:center;
  justify-content:center;
  align-items:center;
  font-size:16px;  
  text-align:center;
  min-height: 38px;
`