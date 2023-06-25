import styled from 'styled-components'

type Props = { 
    bg?: string,
    fontSize?: string,
    fontFamily?: string,
    height?: string,
}

export const Container = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: ${props => props.height? props.height : '90px'};
    border-radius: 10px 10px 0px 0px;
    background-color: ${props => props.bg? props.bg : 'orange'};
    padding-top: 15px;
    margin-bottom: 10px;
    
`

export const Title = styled.span<Props>`
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    width: 100%;    
    font-size: 25px;
    text-align: center;    
    font-family: ${props => props.fontFamily? props.fontFamily : "'Arial Black', Helvetica, sans-serif'"};
    color:white;
`

export const SubTitle = styled.span<Props>`
    position: relative;
    display:flex;
    flex-flow: wrap;
    justify-content: center;    
    align-items: center;
    width: 100%;    
    font-size: 17px;
    letter-spacing: 1px;
    font-family: ${props => props.fontFamily? props.fontFamily : "'Arial Black', Helvetica, sans-serif'"};    
    color:white;
`