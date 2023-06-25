import { useEffect } from 'react'
import { Main, Container } from './styles'
import { layoutStore, mapStore } from '../../../store/index'
import { FormDefault, StrongText } from '../../default/index'
import MapCompanyList from './MapCompanyList'
import MapCompanyAddressRegistration from './MapCompanyAddressRegistration'

export default function Map() {
    
    const map = mapStore(state => state)
    const layout = layoutStore(state => state)

    useEffect(() => {        
        layout.fnOnChangeLayout('sidebarContextComponent', MapCompanyList)
    }, [])
    
    return (
        <Main>
            <Container align='center'>
                {
                    map.isVisibleForm &&
                    <FormDefault>
                        <StrongText title='REGIÃO DE ATENDIMENTO' subTitle='Montar Área de Atendimento' />
                        <MapCompanyAddressRegistration />
                    </FormDefault>
                }                
            </Container>
        </Main>
    )
}