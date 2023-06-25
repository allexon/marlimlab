import { useEffect } from 'react'
import { Main, Container } from './styles'
import { FormDefault, StrongText } from '../../default/index'
import { layoutStore } from '../../../store/index'
import CompanyList from './CompanyList'
import CompanyRegistration from './CompanyRegistration'

export default function Company() {
    
    const layout = layoutStore(state => state)

    useEffect(() => {
        layout.fnOnChangeLayout('sidebarContextComponent', CompanyList)
    }, [])
    
    return (
        <Main>
        <Container align='flex-start'>
            {
                layout.isVisibleForm &&
                <FormDefault>
                    {
                        layout.isBlock &&                            
                        <div style={{position:'absolute', zIndex:'10', display:'flex', borderRadius:'5px', top:'0px', left:'0px', backgroundColor:'gray', opacity:'0.5', height:'100%', width:'100%'}}></div>
                    }
                    <StrongText title={'Cadastro da Empresas'} subTitle={'Gestão de Empresas'} />
                    
                    <div style={{display:'flex', padding:'10px', position:'relative', width:'100%', flexFlow:'row wrap', justifyContent:'center'}}>                            
                        <CompanyRegistration />
                    </div>
                </FormDefault>
            }
        </Container>
    </Main>
    )
}