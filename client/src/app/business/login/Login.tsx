import { useRef } from 'react'
import { Container } from './styles'
import { loginStore, userStore, messageStore } from '../../../store/index'
import { Button, Input, StrongText, FormDefault } from '../../default/index'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const login = loginStore(state => state)
    const user = userStore(state => state)
    const message = messageStore(state => state)
    const useMavigate = useNavigate()
    
    // Ref    
    const emailRef = useRef<HTMLInputElement>(null)
    
    const fnResetFormLogin = (e : any) => {
        e.preventDefault()
        login.fnResetLogin()
        setTimeout(() => {useMavigate('/marlimlab/user')}, 600)
    }

    const fnSubmit = () => {
    }
    
    return (        
        <Container>
            <FormDefault>
                <StrongText title='ACESSO ADMINISTRATIVO' subTitle='Controle de acesso login' />
                <Input 
                    label='E-mail'   
                    value={login.email}
                    ref={emailRef}
                    fnOnPress={() => fnSubmit()} 
                    fnOnChange={(e) => login.fnOnChangeLogin('email', e.target.value)}
                    className='type-email' 
                    autoFocus 
                />
                <Button className={(login.email == '' || message.isLoading) && 'button-disable'} onClick={(e) => fnSubmit()}>Entrar</Button>
            </FormDefault>
        </Container>
    )
}