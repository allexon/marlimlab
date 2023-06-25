import { useEffect } from 'react'
import { Main, Container } from './styles'
import { addressStore, layoutStore } from '../../../store/index'
import { FormDefault, StrongText } from '../../default/index'
import AddressList from './AddressList'
import AddressRegistration from './AddressRegistration'
import AddressCustomRegistration from './AddressCustomRegistration'

export default function Address() {

    const address = addressStore(state => state)
    const layout = layoutStore(state => state)

    useEffect(() => {
        layout.fnOnChangeLayout('sidebarContextComponent', AddressList)
    }, [])

    return (
        <Main>
            <Container align='center'>
                {
                    layout.isVisibleForm &&
                    <FormDefault>
                        <StrongText title='CADASTRO DE ENDEREÇO' subTitle='Controle Geral de Endereços' />
                        {address.cepManual == 'sim'? <AddressCustomRegistration /> : <AddressRegistration />}
                    </FormDefault>
                }                
            </Container>
        </Main>
    )
}