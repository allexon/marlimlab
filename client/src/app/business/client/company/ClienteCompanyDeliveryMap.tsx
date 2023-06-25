import { Container } from '../styles'
import { clientStore } from '../../../../store/index'

export default function ClientCompanyDeliveryMap()  {
    
    // Store
    const client = clientStore(state => state)
        
    return (
        <Container>
            <span>MAPEAR REGIÃO DE ATENDIMENTO</span>
        </Container>
    )
}