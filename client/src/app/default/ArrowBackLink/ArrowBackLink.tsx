import { Container, Button }  from './styles'
import { ArrowBackSvg } from '../../../assets/svg/index'

type Props = {
    id?: string,
    align?: string,
    link: string
    onClick?: (e : any) => void
}

export default function ArrowBackLink(props : Props) {
    return (
        <Container>            
            <Button 
                id={props.id? props.id : 'button-link-default'}
                onClick={props.onClick}
                to={props.link}
                align={props.align}
            >
                <ArrowBackSvg />
            </Button>
        </Container>
    )
}

// **** Como Utilizar Component ********
// <ArrowBackLink link='/' />



