import styled from 'styled-components'

type Props = { 
    bg?: string,
    width?: string,
    textTransform?: string
}

export const Container = styled.div<Props>`
    position: relative;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: ${props => props.width? props.width : '100%'};
    height: 3vh;
    margin:5px;
    margin-top: 15px;
    border-bottom:solid 1px gray;
    //border:solid 1px red;

    input {
        position: absolute;
        width: 100%;
        bottom:3px;
        background-color: transparent;
        color: #FFCC29;        
        font-size: 14px;
        letter-spacing: 0.5px;
        font-family: arial;        
        text-transform: ${props => props.textTransform? props.textTransform : 'normal'};
        border:none;
        
        &:focus {
            outline: none;
        }

        &.text-align-right {
            text-align: right;
        }

        &.type-email {
            text-transform: lowercase;
        }
    }

    label {
        position: absolute;
        display:flex;
        flex-flow: row wrap;
        align-items: flex-end;
        text-align: left;
        color: #A9ABAE;
        width: 100%;
        top:-18px;        
        font-size: 12px;
        font-family: arial;

        &.text-align-right {
            padding-left: 13px;
        }
    }
`

