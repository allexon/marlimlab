import styled from 'styled-components'
import { bounceInModalDefaultContent, bounceOutUp } from '../../../assets/css/animations'

type Props = {
    width?: string,
    height?: string,
}

export const Main = styled.div`    
    position: fixed;
    display:flex;
    flex-flow: column nowrap;    
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;    
    justify-content:center;
    align-items:center;
    transition: 1s;    
    z-index: 11 !important;    
    top:0px;
    left:0px;
`
export const Container = styled.div<Props>`
    position:relative;
    position: fixed;
    display:flex;
    flex-flow: column nowrap;
    background-color: white;    
    width: ${props => props.width? props.width : '380px'};
    height: ${props => props.height? props.height : 'auto'};
    justify-content:center;
    align-items:center;
    border-radius: 5px;
    box-shadow: inset 0 0 0.3em white, 0 0 0.3em white;
    z-index: 3 !important;
    
    &.in-modal {
        animation-name: ${bounceInModalDefaultContent};
        animation-duration: 0.9s;
        transition: background-color 1s linear 0.1s;
    }

    &.out-modal {
        animation-name: ${bounceOutUp};
        animation-duration: 0.9s;
        transition: background-color 1s linear 0.1s;
    }
`

export const ButtonCloseModal = styled.button`
    position:absolute;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    border:none;
    width:30px;
    height:30px;    
    color:red;
    background-color:transparent;
    top: -20px;
    right:-30px;
    font-size:17px;
    z-index:1
`