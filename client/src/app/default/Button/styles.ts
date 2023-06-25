import styled from 'styled-components'

type Props = { 
    bg?: string,
    height?: string,
    width?: string,
}

export const Container = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;    
    width: ${props => props.width? props.width : '160px'};
    height: ${props => props.height? props.height : '30px'};
    
    button  {
        width: 100%;
        height: 100%;
        border-top:solid 1px #0D8651;
        border-left:solid 1px #0D8651;        
        border-bottom:solid 1px #0C583A;
        border-right:solid 1px #0C583A;    
        background-color: ${res => res.bg? res.bg : '#006B3E'};
        border-radius: 2px;
        font-size: 14px;
        font-family: 'Oswald';
        text-transform: uppercase;
        letter-spacing: 3px;
        color:white;
        transition: 0.2s all;
        box-shadow: 1px 1px 1px 1px #000000;
        transition: box-shadow 0.2s ease, transform 0.2s ease;

        &.button-enable {
            &:hover {
                background-color: ${res => res.bg? res.bg : '#006B3E'};
                color:white;
                border-top:solid 2px #0D8651;
                border-left:solid 2px #0D8651;        
                border-bottom:solid 2px #0A583B;
                border-right:solid 2px #0A583B;
            }

            &:active {
                box-shadow: 0 0 0 0 transparent, inset 1px 1px 1px transparent;
                transform: translate(6px, 6px);
            }
        }

        &.button-red {
            background-color: tomato;
            color:white;
            border-top:solid 1px #F8AC92;
            border-left:solid 1px #F8AC92;        
            border-bottom:solid 1px #B54D3D;
            border-right:solid 1px #B54D3D;
            transition: 0.2s all;
            box-shadow: 1px 1px 1px 1px #B54D3D;
            transition: box-shadow 0.2s ease, transform 0.2s ease;

            &:hover {
                background-color: #DB5A46;
            }
        }

        &.button-orange {
            background-color: #ff6609;
            color:white;
            border-top:solid 1px #C3583E;
            border-left:solid 1px #C3583E;        
            border-bottom:solid 1px #A24B2C;
            border-right:solid 1px #A24B2C;
            transition: 0.2s all;
            box-shadow: 1px 1px 1px 1px #763B2C;
            transition: box-shadow 0.2s ease, transform 0.2s ease;

            &:hover {
                background-color: #ff6609;
            }
        }

        &.button-disable {            
            background-color: transparent;
            color:orange;
            border-top:solid 1px gray;
            border-left:solid 1px gray;        
            border-bottom:solid 1px #000000;
            border-right:solid 1px #000000;
            background-color: #373435;
            box-shadow: 0 0 0 0 transparent, inset 2px 2px 2px transparent;
            color:#000000;
            cursor:no-drop;
            pointer-events: none;
        }
}   
`

