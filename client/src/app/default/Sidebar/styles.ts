import styled from 'styled-components'

type Props = {        
    rotate?: string | undefined,
    bg?: string,
    left?: string,
    width?: string, 
    open?: boolean
}

export const Container = styled.div<Props>`
    position: relative;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: ${props => props.width};
    height: 100%;
    z-index: 3;
    background-color: ${props => props.bg}; 
    margin-left: ${props => props.left};
    border-radius: 0px 15px 15px 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;
`

export const ContainerAba = styled.div`
    position: absolute;
    display: flex;    
    flex-flow: row nowrap;
    cursor: pointer;    
    width: 30px;
    height: 80px;
    right:-30px;
`

export const Button = styled.button`
    position: relative;
    background-color: transparent;        
    display:flex;
    flex-flow: row nowrap;        
    right:0px;
    width: 100px;
    cursor: pointer;
`

export const SvgAba = styled.svg`
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 19px;
    width: 20px;
`

export const SvgArrow = styled.svg`
    position: absolute;
    width: 5px;
    height: 18px;
    top:38px;    
    right:10px;
    z-index: 4;
    transform: rotate(0deg);

    &.cento-graus {
        transform: rotate(180deg);
    }
`