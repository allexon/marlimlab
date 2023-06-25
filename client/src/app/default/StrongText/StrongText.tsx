import { Container, Title, SubTitle } from './styles'
import { marlimThemeStore } from '../../../store'

type Props = {
    id?: string,    
    title: string,
    subTitle?: string,    
    className?: string,
    fontSize?: string,    
    fontFamily?: string,
    bg?: string,
    height?: string
}

export default function StrongText(props : Props) {

    const theme = marlimThemeStore(state => state)

    return (
        <Container bg={props.bg} height={props.height} id={props.id? props.id : 'title-default'} className={props.className? props.className : ''}>            
            <Title fontFamily={theme.fontOswald}>{props.title}</Title>
            <SubTitle fontFamily={theme.fontOswald}>{props.subTitle}</SubTitle>
        </Container>
    )
}