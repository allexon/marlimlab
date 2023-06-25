import styled from 'styled-components'

type Props = {
    position?: string;
    width?: string;
    top?: string;
}

export const InputValidSvg = (props: Props) => (
    <SVG position={props.position} width={props.width} top={props.top} viewBox="0 0 14.817 14.831" preserveAspectRatio="none">
        <g transform="translate(-72.343 -110.91)">
            <path d="m77.676 125.74-5.3329-6.7564 2.1716-2.8838 3.0513 4.0099 7.532-9.2008 2.0617 2.8289z" fill="#a4cd3c" fillRule="evenodd"/>
        </g>
    </SVG>
)

const SVG = styled.svg<Props>`
    position: ${res => res.position? res.position : 'absolute' };
    display: flex;    
    flex-flow: row nowrap;
    justify-content: center;
    width: ${res => res.width? res.width : '12px'};    
    top: ${res => res.top? res.top : '10px' };
    right:10px;
    z-index:1;
`