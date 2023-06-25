import { useRef } from 'react'
import { ContainerButtons } from './styles'
import { messageStore, clientStore } from '../../../store/index'
import { ButtonDefault, Input } from '../../default/index'
import { useClient } from '../../../hooks'

export default function ClientSocialMedia() {
    
    const client = clientStore((state: any) => state)
    const message = messageStore((state: any) => state)

    // Ref
    const youtubeClientRef = useRef<HTMLInputElement>(null)
    const instagramClientRef = useRef<HTMLInputElement>(null)    
    const facebookClientRef = useRef<HTMLInputElement>(null)
    const linkedinClientRef = useRef<HTMLInputElement>(null)
    const twitterClientRef = useRef<HTMLInputElement>(null)
    const whatsappClientRef = useRef<HTMLInputElement>(null)

    const { fnSubmitClient, fnOnChangeClientDataRegister } = useClient()
    
    return (
        <>
            <Input
                label='Canal no youtube' 
                value={client.dataRegister[0].CLIENTE_YOUTUBE} 
                fnOnChange={(e) => fnOnChangeClientDataRegister('CLIENTE_YOUTUBE', e.target.value)} 
                ref={youtubeClientRef}
                fnOnPress={() => instagramClientRef.current?.focus()}
                isValidInput={null}
                icon='000295-youtube'                
                autoFocus 
            />

            <Input
                label='Informe seu Instagram' 
                value={client.dataRegister[0].CLIENTE_INSTAGRAM} 
                fnOnChange={(e) => fnOnChangeClientDataRegister('CLIENTE_INSTAGRAM', e.target.value)} 
                ref={instagramClientRef} 
                fnOnPress={() => facebookClientRef.current?.focus()}
                isValidInput={null}
                icon='000004-instagram'                
            />

            <Input
                label='Qual é o seu Facebook' 
                value={client.dataRegister[0].CLIENTE_FACEBOOK} 
                fnOnChange={(e) => fnOnChangeClientDataRegister('CLIENTE_FACEBOOK', e.target.value)} 
                ref={facebookClientRef}
                fnOnPress={() => linkedinClientRef.current?.focus()}
                isValidInput={null}
                icon='000006-facebook'                
            />

            <Input
                label='Qual é o seu Linkedin' 
                value={client.dataRegister[0].CLIENTE_LINKEDIN} 
                fnOnChange={(e) => fnOnChangeClientDataRegister('CLIENTE_LINKEDIN', e.target.value)} 
                ref={linkedinClientRef}
                fnOnPress={() => twitterClientRef.current?.focus()}
                isValidInput={null}
                icon='000008-linkedin'                
            />

            <Input 
                label='Informe seu Twitter' 
                value={client.dataRegister[0].CLIENTE_TWITTER} 
                fnOnChange={(e) => fnOnChangeClientDataRegister('CLIENTE_TWITTER', e.target.value)} 
                ref={twitterClientRef} 
                fnOnPress={() => whatsappClientRef.current?.focus()}
                isValidInput={null}
                icon='000296-twitter'
            />

            <ContainerButtons align='center'>
                <ButtonDefault label='SALVAR' bg='green' icon='icon-000056-cloud' onClick={() => fnSubmitClient()} className={(message.isLoading) && 'button-disable'} />
            </ContainerButtons>
        </>
    )
}