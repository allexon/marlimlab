import { Container } from '../styles'
import { messageStore, clientStore, addressStore, layoutStore, marlimThemeStore, modalStore } from '../../../../store/index'

export default function ClientCompanyConfig()  {
    
    // Store
    const client = clientStore(state => state)
    const message = messageStore(state => state)
    const modal = modalStore(state => state)
    const address = addressStore(state => state)
    const layout = layoutStore(state => state)
    const marlimTheme1 = marlimThemeStore(state => state)
    
    return (
        <Container>
            <span>CONFIGURAÇÕES DE FUNCIONAMENTO DA EMPRESA</span>
        </Container>
    )
}