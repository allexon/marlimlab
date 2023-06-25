import { useEffect } from 'react'
import { Main, Container } from './styles'
import { layoutStore, gasStore } from '../../../store/index'
import { FormDefault, StrongText } from '../../default/index'
import ProductRevendaGasList from './ProductRevendaGasList'
import ProductRevendaGasRegistration from './ProductRevendaGasRegistration'

export default function Address() {
    
    const gas = gasStore(state => state)
    const layout = layoutStore(state => state)

    useEffect(() => {        
        layout.fnOnChangeLayout('sidebarContextComponent', ProductRevendaGasList)
    }, [])
    
    return (
        <Main>
            <Container align='center'>
                {
                    gas.isVisibleForm &&
                    <FormDefault>
                        <StrongText title='CADASTRO DE PRODUTOS' subTitle='Gestão de Produtos para Revenda de Gás' />
                        <ProductRevendaGasRegistration />
                    </FormDefault>
                }                
            </Container>
        </Main>
    )
}