import styled from 'styled-components'

type Props = {
    position?: string;
    width?: string;
    bottom?: string;
}

export const ArrowBackSvg = (props: Props) => (
    <SVG position={props.position} width={props.width} bottom={props.bottom} viewBox="0 0 14.817 14.831" preserveAspectRatio="none">
        <g transform="translate(-80.869 -198.7)">
            <path d="m80.886 206.74 9.1892 6.7831 1.4058-0.66803v-3.049h9.0692v-6.9887h-9.0692v-3.4772l-1.1487-0.63379-9.4635 7.0058z" fill="#006a3d" fillRule="evenodd"/>
        </g>
    </SVG>
)

const SVG = styled.svg<Props>`
    position: ${res => res.position? res.position : 'absolute' };
    display: flex;    
    flex-flow: row nowrap;
    justify-content: center;
    width: ${res => res.width? res.width : '20px'};    
    bottom: ${res => res.bottom? res.bottom : '10px' };
    left:10px;
    z-index:1;    
`