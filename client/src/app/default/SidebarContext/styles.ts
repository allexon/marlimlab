import styled from 'styled-components'

type Props = {
    rotate?: string | undefined,
    bg?: string,    
    width?: string, 
    isOpen?: boolean
}

export const Container = styled.div<Props>`
    position: relative;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: flex-start;
    width: ${props => props.width};
    height: 88vh;
    z-index: 2;
    left: ${props => props.isOpen? '0px' : '-251px'};    
    background-color: transparent;
`

export const ContainerSidebarContext = styled.div<Props>`
    position: absolute;
    display: flex;
    flex-flow: row wrap;    
    justify-content: flex-start;
    align-items: flex-start;
    width: ${props => props.width};
    height: 80vh;
    width: 250px;
    z-index: 2;
    background-color: ${props => props.bg}; 
    border-radius: 0px 15px 15px 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;    
`

export const ContainerAba = styled.div`
    position: absolute;
    display:flex;
    flex-flow: row nowrap;
    align-self: center;
    cursor: pointer;    
    width: 0px;
    height: 80px;
    right:0px;
    z-index: 3;
`

export const Button = styled.button`
    position: relative;
    background-color: transparent;        
    display:flex;
    flex-flow: row nowrap;        
    right:0px;
    width: 100px;
    cursor: pointer;    

    &::after {
        position: absolute;
        content:'';
        border:solid 1px #fff;
        top:-107px;        
        height: 90px;
        z-index:4;
    }
`

export const SvgAba = styled.svg`
    position: absolute;
    z-index: 1;
    top: -110px;
    left: 19px;
    width: 20px;    
    //stroke: orange;
`

export const SvgArrow = styled.svg`
    position: absolute;
    width: 5px;
    height: 18px;
    top:-70px;    
    right:7px;
    z-index: 4;
    transform: rotate(0deg);

    &.cento-graus {
        transform: rotate(180deg);
    }
`