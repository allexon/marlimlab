import { useRef } from 'react'
import { ContainerButtons } from '../styles'
import { messageStore, clientStore, marlimThemeStore } from '../../../../store/index'
import { Input, ButtonDefault } from '../../../default/index'
import { useClient } from '../../../../hooks'

export default function ClientCompanySociaMedia() {
    
    // Store
    const client = clientStore(state => state)
    const message = messageStore(state => state)
    const theme = marlimThemeStore(state => state)
    
    // Hooks
    const { fnOnChangeClientCompanies, fnOnChangeClientDataRegister, fnSubmitClient } = useClient()

    // Ref
    const instagramCompanyRef : any = useRef<HTMLInputElement>(null)
    const facebookCompanyRef : any = useRef<HTMLInputElement>(null)
    const linkedinCompanyRef : any = useRef<HTMLInputElement>(null)    
    const twitterCompanyRef : any = useRef<HTMLInputElement>(null)
    const youtubeCompanyRef : any = useRef<HTMLInputElement>(null)
    const whatsappCompanyRef : any = useRef<HTMLInputElement>(null)
                
    return (
        <>  
            <Input
                label='Canal no youtube' 
                value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].YOUTUBE_EMPRESA} 
                fnOnChange={(e) => fnOnChangeClientCompanies('YOUTUBE_EMPRESA', e.target.value, client.activeIndexCompany)}
                ref={youtubeCompanyRef}
                fnOnPress={() => instagramCompanyRef.current?.focus()}
                isValidInput={null}
                icon='000295-youtube'
            />

            <Input
                label='Qual o Instagram da empresa' 
                value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].INSTAGRAM_EMPRESA} 
                fnOnChange={(e) => fnOnChangeClientCompanies('INSTAGRAM_EMPRESA', e.target.value, client.activeIndexCompany)}
                ref={instagramCompanyRef} 
                fnOnPress={() => facebookCompanyRef.current?.focus()}
                isValidInput={null}
                icon='000004-instagram'
            />

            <Input
                label='Qual o Facebook da empresa'                 
                value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].FACEBOOK_EMPRESA} 
                fnOnChange={(e) => fnOnChangeClientCompanies('FACEBOOK_EMPRESA', e.target.value, client.activeIndexCompany)}
                ref={facebookCompanyRef}
                fnOnPress={() => linkedinCompanyRef.current?.focus()}
                isValidInput={null}
                icon='000006-facebook'
            />

            <Input
                label='Qual o Linkedin da empresa' 
                value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].LINKEDIN_EMPRESA} 
                fnOnChange={(e) => fnOnChangeClientCompanies('LINKEDIN_EMPRESA', e.target.value, client.activeIndexCompany)}
                ref={linkedinCompanyRef}
                fnOnPress={() => twitterCompanyRef.current?.focus()}
                isValidInput={null}
                icon='000008-linkedin'
            />

            <Input
                label='Qual o Twitter da empresa'
                value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].TWITTER_EMPRESA} 
                fnOnChange={(e) => fnOnChangeClientCompanies('TWITTER_EMPRESA', e.target.value, client.activeIndexCompany)}
                ref={twitterCompanyRef}
                fnOnPress={() => whatsappCompanyRef.current?.focus()}
                isValidInput={null}
                icon='000296-twitter'
            />

            <ContainerButtons align='center'>
                <ButtonDefault label='SALVAR' bg='green' icon='icon-000056-cloud' onClick={() => fnSubmitClient()} className={(message.isLoading) && 'button-disable'} />
            </ContainerButtons>
        </>
    )
}