import styled from 'styled-components'

type Props = {
    position?: string;
    width?: string;
    top?: string;
}

export const ArrowOpenCloseSvg = (props: Props) => (
    <Container>
        <SVG position={props.position} width={props.width} top={props.top} viewBox="0 0 3.3911 10.834" preserveAspectRatio="none">
            <g transform="translate(-64.141 -106.13)">
                <path d="m65.321 111.54 2.2107 5.2171-0.46014 0.19989-2.9309-5.417 2.9309-5.417 0.46014 0.19989z" fill="#74251f" fillRule="evenodd"/>
            </g>
        </SVG>
    </Container>
)

const Container = styled.div<Props>`
    position: absolute;
    display:flex;
    flex-flow: row nowrap;
    height: 90px;
    right: 10px;
    cursor: pointer;
    z-index: 2;
`

const SVG = styled.svg<Props>`
    position: ${res => res.position? res.position : 'absolute' };
    width: ${res => res.width? res.width : '5px'};
    height: 18px;
    top:28px;    
    left:-5px;
    transform: rotate(0deg);
`