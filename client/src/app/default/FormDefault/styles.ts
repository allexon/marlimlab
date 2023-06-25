import styled  from 'styled-components'

type Props = {
    align?: string
}

export const Container = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    width: 450px;
    height: auto;
    justify-content: ${props => props.align? props.align : 'flex-start'};    
    background-color: white;
    border-radius: 10px;    
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;
`