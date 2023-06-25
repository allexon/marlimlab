import { Container } from '../styles'
import { clientStore } from '../../../../store/index'

export default function ClientCompanyProduct()  {
    
    // Store
    const client = clientStore(state => state)
        
    return (
        <Container>
            <span>CADASTRO DE PRODUTOS</span>
        </Container>
    )
}