import React, { useRef, useImperativeHandle, ForwardedRef, useEffect } from 'react'
import { ContainerButtons } from './styles'
import { messageStore, clientStore } from '../../../store/index'
import { ButtonDefault, Input } from '../../default/index'
import { fnMascaredCpf, fnMascaredCell } from '../../../functions/index'
import { useClient } from '../../../hooks'
import ClientAddress from './ClientAdresses'

type ClientRegistrationProps = {}

type ClientRegistrationRef = {
  fnFocusnameClientRef: () => void;
}

export const ClientRegistration = React.forwardRef<ClientRegistrationRef, ClientRegistrationProps>((props, ref: ForwardedRef<ClientRegistrationRef>) => {

  // Store
  const client = clientStore((state: any) => state)
  const message = messageStore((state : any) => state)

  // Hooks
  const { fnSubmitClient, fnOnChangeClientDataRegister } = useClient()
  
  // Ref
  const nameClientRef = React.useRef<HTMLInputElement>(null)
  const emailClientRef = React.useRef<HTMLInputElement>(null)
  const cellClientRef = React.useRef<HTMLInputElement>(null)
  const cpfClientRef = React.useRef<HTMLInputElement>(null)
  const rgClientRef = React.useRef<HTMLInputElement>(null)
  const whatsappClientRef = React.useRef<HTMLInputElement>(null)
  
  // useEffect(() => {
  //   nameClientRef.current?.focus()
  // }, [nameClientRef.current?.focus()])

  return (
      <>
          <Input 
              label='Nome' 
              value={client.dataRegister[0].CLIENTE_NOME?.toUpperCase()}
              fnOnChange={(e) => e && fnOnChangeClientDataRegister('CLIENTE_NOME', e.target.value)}
              ref={nameClientRef} 
              fnOnPress={() => emailClientRef.current?.focus()}
              isValidInput={null}
              autoFocus 
          />

          <Input 
              label='E-mail' 
              value={client.dataRegister[0]?.CLIENTE_EMAIL} 
              fnOnChange={(e) => e && fnOnChangeClientDataRegister('CLIENTE_EMAIL', e.target.value.toLowerCase())} 
              ref={emailClientRef} 
              fnOnPress={() => cellClientRef.current?.focus()}
              isValidInput={null}
              icon='000001-email'
          />

          <Input 
              label='Celular' 
              value={fnMascaredCell(client.dataRegister[0]?.CLIENTE_CELULAR)} 
              fnOnChange={(e) => e && fnOnChangeClientDataRegister('CLIENTE_CELULAR', fnMascaredCell(e.target.value))}
              ref={cellClientRef}
              fnOnPress={() => whatsappClientRef.current?.focus()}              
              isValidInput={null}
              placeholder='apenas digite DD+número'
              width='48%'
              icon='000011-smart-phone'
          />

            <Input 
                label='Whatsapp' 
                value={fnMascaredCell(client.dataRegister[0].CLIENTE_WHATSAPP)} 
                fnOnChange={(e) => fnOnChangeClientDataRegister('CLIENTE_WHATSAPP', fnMascaredCell(e.target.value))} 
                ref={whatsappClientRef} 
                fnOnPress={() => cpfClientRef.current?.focus()}
                width='48%'
                placeholder='apenas digite DD+número'
                isValidInput={null}
                icon='000297-whatsapp'                
            />

          <Input 
              label='CPF' 
              value={fnMascaredCpf(client.dataRegister[0]?.CLIENTE_CPF)}
              fnOnChange={(e) => e && fnOnChangeClientDataRegister('CLIENTE_CPF', fnMascaredCpf(e.target.value))}
              ref={cpfClientRef} 
              fnOnPress={() => rgClientRef.current?.focus()}
              isValidInput={null}
                width='48%'
            />

            <Input 
                label='RG' 
                value={client.dataRegister[0]?.CLIENTE_RG} 
                fnOnChange={(e) => e && fnOnChangeClientDataRegister('CLIENTE_RG', e.target.value)} 
                ref={rgClientRef} 
                fnOnPress={() => nameClientRef.current?.focus()}
                isValidInput={null}
                width='48%'
            />

            <ClientAddress />
            
            <ContainerButtons style={{justifyContent:'center'}}>
              <ButtonDefault bg='green' icon='icon-000056-cloud' className={(message.isLoading)} label='SALVAR' onClick={() => fnSubmitClient()} />
            </ContainerButtons>
        </>
    )
})