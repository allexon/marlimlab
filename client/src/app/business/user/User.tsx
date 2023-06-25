import { useEffect } from 'react'
import { FormDefault, StrongText } from '../../default/index'
import { Main, Container } from './styles'
import { userStore, layoutStore } from '../../../store/index'
import UserList from './UserList'
import UserRegistration from './UserRegistration'

export default function User() {
    
    const layout = layoutStore(state => state)
    const user = userStore(state => state)

    useEffect(() => {
        layout.fnOnChangeLayout('sidebarContextComponent', UserList)
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
                        <StrongText title={user.title} subTitle={user.subTitle} />
                        
                        <div style={{display:'flex', padding:'10px', position:'relative', width:'100%', flexFlow:'row wrap', justifyContent:'center'}}>                            
                        {<UserRegistration />}
                        </div>
                    </FormDefault>
                }
            </Container>
        </Main>
    )
}