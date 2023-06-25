import { Container, Button, Icon, Label } from './styles'
import { marlimThemeStore } from '../../../store/index'

type Props = {
    id?: string,
    icon: string,
    label: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function ButtonIcon( props : Props) {

    const theme = marlimThemeStore(state => state)
    
    return (
        <Container>
            <Button onClick={props.onClick}>
                <Icon className={props.icon} />
                <Label>{props.label}</Label>
            </Button>
        </Container>
    )
}