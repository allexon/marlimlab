import { Container, Button, Line }  from './styles'

type Props = {
    id?: string,
    children : React.ReactNode,
    align?: string,
    buttonWidth?: string,
    link: string
    lineWidth?: string,
    onClick?: (e : any) => void
}

export default function ButtonLink(props : Props) {
    return (
        <Container>            
            <Button 
                id={props.id? props.id : 'button-link-default'}
                onClick={props.onClick}
                to={props.link}
                align={props.align}
                width={props.buttonWidth}
            >                
            <Line width={props.lineWidth} align={props.align} />
            {props.children}
            </Button>
        </Container>
    )
}



