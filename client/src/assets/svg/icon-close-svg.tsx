import { StaticHandler } from '@remix-run/router';
import styled from 'styled-components'

type Props = {
    position?: string;
    width?: string;
    top?: string;
    fill?: string;
}

export const IconCloseSvg = (props: Props) => (
    <SVG position={props.position} width={props.width} top={props.top} viewBox="0 0 14.552 14.817" preserveAspectRatio="none">
        <g transform="translate(-74.472 -112.4)">
            <path d="m74.813 112.75c-0.45542 0.45502-0.45542 1.1944 0 1.6495l5.3227 5.4318-5.3227 5.4034c-0.45542 0.45502-0.45542 1.1944 0 1.6494 0.42696 0.45502 1.167 0.45502 1.6224 0l5.3227-5.4034 5.2943 5.4034c0.45542 0.45502 1.1955 0.45502 1.6509 0 0.42696-0.45502 0.42696-1.1944 0-1.6494l-5.3227-5.4034 5.3227-5.4318c0.42696-0.45502 0.42696-1.1944 0-1.6495-0.45542-0.45502-1.1955-0.45502-1.6509 0l-5.2943 5.4034-5.3227-5.4034c-0.45542-0.45502-1.1955-0.45502-1.6224 0z" fill={props.fill} fillRule="evenodd"/>
        </g>
    </SVG>
)

const SVG = styled.svg<Props>`
    position: ${props => props.position? props.position : 'absolute' };
    display: flex;    
    flex-flow: row nowrap;
    justify-content: center;
    width: ${res => res.width? res.width : '12px'};
    justify-content: center;
    align-items: center;
    z-index:1;
    fill: ${props => props.fill? props.fill : 'black' };
`