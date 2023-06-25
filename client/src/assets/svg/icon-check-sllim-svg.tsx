import styled from 'styled-components'

type Props = {
    position?: string,
    width?: string,
    top?: string,
    stroke?: string
}

export const IconCheckSllimSvg = (props: Props) => (
        <ContainerSvg>        
            <SVG position={props.position} width={props.width} top={props.top} viewBox="0 0 10.213 15.132" preserveAspectRatio="none">
                <g transform="translate(-106.75 -106.75)">
                    <path d="m111.85 106.75c2.8209 0 5.1116 2.2887 5.1116 5.0972 0 3.1182-2.6008 6.4364-4.6915 8.3253l-0.75023-0.02c-1.9506-1.769-4.7715-5.287-4.7715-8.3054 0-2.8084 2.2907-5.0972 5.1016-5.0972zm0 14.352c1.5905 0 2.8809 0.1799 2.8809 0.38978s-1.2904 0.38978-2.8809 0.38978-2.8709-0.1799-2.8709-0.38978 1.2804-0.38978 2.8709-0.38978zm0.19006-11.234c1.0003 0 1.8006 0.79955 1.8006 1.799 0 0.98945-0.80025 1.799-1.8006 1.799-0.99031 0-1.8006-0.80954-1.8006-1.799 0-0.99944 0.81026-1.799 1.8006-1.799z" fill="#221e1f" fillRule="evenodd"/>
                </g>
            </SVG>        
        </ContainerSvg>
)

const ContainerSvg = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row nowrap;    
    width: 60px;
    height:50px;
    justify-content: center;
    align-items: center;    
    z-index: 2;
`

const SVG = styled.svg<Props>`
    position: ${props => props.position? props.position : 'absolute' };
    width: ${props => props.width? props.width : '100%'};
    stroke: ${props => props.color? props.color : '#74251f'}
`