import { useEffect, useRef } from 'react'
import { clientStore, messageStore } from '../../../store/index'
import { Button, Input, FormDefault} from '../../default/index'
import { fnMascaredCpf, fnMascaredCep, fnMascaredOnlyNumber, fnIsValidCpf } from '../../../functions/index'

export default function CompanyRegistration() {
    
    const client = clientStore(state => state)
    const message = messageStore(state => state)
        
    // Ref
    const nameRef : any = useRef<HTMLInputElement>(null)
    const cnpjRef = useRef<HTMLInputElement>(null)
    const inscEstRef = useRef<HTMLInputElement>(null)
        
    useEffect(() => {
    }, [])
    
    const fnSubmit = (e : any) => {
    }

    return (
        <FormDefault>
            <span>Empresas do cliente</span>
            <Button className={(message.isLoading) && 'button-disable'} onClick={(e) => fnSubmit(e)}>Salvar</Button>
        </FormDefault>
    )
}