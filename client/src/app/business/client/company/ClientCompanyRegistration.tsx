import { useEffect, useRef } from 'react'
import { ContainerButtons } from '../styles'
import { messageStore, clientStore, marlimThemeStore, companyCategoryStore } from '../../../../store/index'
import { ButtonDefault, Input, SelectDefault } from '../../../default/index'
import { fnMascaredCnpj, fnMascaredCep } from '../../../../functions/index'
import { useClient } from '../../../../hooks'
import ClientAddressPj from './ClientAddressPj'

export default function ClientCompanyRegistration() {
    
    // Store
    const client = clientStore(state => state)
    const message = messageStore(state => state)
    const theme = marlimThemeStore(state => state)
    const companyCategory = companyCategoryStore(state => state)
    
    // Hooks
    const { fnOnChangeClientCompanies, fnSubmitClient, fnBackCompanyList } = useClient()

    // Ref
    const razaoSocialRef : any = useRef<HTMLInputElement>(null)
    const nomeFantasiaRef : any = useRef<HTMLInputElement>(null)
    const cnpjRef : any = useRef<HTMLInputElement>(null)
    const inscricaoEstadualRef : any = useRef<HTMLInputElement>(null)
    const telefoneFixoRef : any = useRef<HTMLInputElement>(null)   
    const celularWhatzappRef : any = useRef<HTMLInputElement>(null)
    const emailEmpresaRefRef : any = useRef<HTMLInputElement>(null)
    const companyCategoryRefRef : any = useRef<HTMLInputElement>(null)
    const expedientCompanyRefRef : any = useRef<HTMLInputElement>(null)
            
    useEffect(() => {    
    }, [])

    const fnValidFields = () => {        
        let _errors: any[]
        let _hasError: boolean = false
        _errors = [
            {id:1, error: client.dataRegister[0].CLIENTE_EMPRESAS[0].RAZAO_SOCIAL?.trim() == '', message:<span>Por favor digite a <b>[ RAZÃO SOCIAL ]</b></span>},
            {id:2, error: client.dataRegister[0].CLIENTE_EMPRESAS[0].RAZAO_SOCIAL?.trim().length <= 9, message:<span><b>[ RAZÃO SOCIA ]</b>, mínimo de 10 caracteres permitido</span>},
            {id:3, error: client.dataRegister[0].CLIENTE_EMPRESAS[0].NOME_FANTASIA?.trim() == '', message:<span>Por favor digite a <b>[ NOME FANTASIA ]</b></span>},
            {id:4, error: client.dataRegister[0].CLIENTE_EMPRESAS[0].NOME_FANTASIA?.trim().length <= 9, message:<span><b>[ NOME FANTASIA ]</b>, mínimo de 10 caracteres permitido</span>},
            {id:5, error: client.dataRegister[0].CLIENTE_EMPRESAS[0].CNPJ?.trim() == '', message:<span>Por favor digite a <b>[ CNPJ ]</b></span>},
            {id:6, error: client.dataRegister[0].CLIENTE_EMPRESAS[0].CNPJ?.trim().length < 14, message:<span><b>[ CNPJ ]</b>, Precisa de 14 digitos, contando apenas os números</span>},
            
        ]
        let _errorsFilter = _errors.filter(res => res.error)
        
        _errorsFilter = _errorsFilter.sort((a, b) => {return a.id - b.id})
        
        let _stop = false
        _errorsFilter.map(res => {if(_stop) {return}
            if(res.error) {
                message.fnError(res?.message)
                _hasError = true
                _stop = true
            }
        })
        return _hasError
    }

    const fnSubmit = () => {
        if(fnValidFields()) {return}        
        fnSubmitClient()
    }

    const fnUploadImage = async (e : any) => {
        e.preventDefault()

        if(e.target.files[0]) {
            let _file = e.target.files[0]
            const reader = new FileReader
            reader.readAsDataURL(_file)

            reader.onload = () => {                
                fnOnChangeClientCompanies('IMG_LOGO', reader.result, client.activeIndexCompany)
            }
        } else {
            console.log(':: NENHUM AQUIVO FOI SELECIONADO')
        } // end
        
    }

    return (
        <div style={{display:'flex', position:'relative', width:'100%', flexFlow:'row wrap'}}>

            <div style={{margin:'5px 0px 5px 0px', display:'flex', position:'relative', flex:1, height:'100px', flexFlow:'row nowrap', justifyContent:'center', alignItems:'center'}}>

                {
                    client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].IMG_LOGO &&
                    <div style={{position:'relative', top:'0px', left:'0px', display:'flex', width:'50%', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', width:'100px', height:'100px', justifyContent:'center', alignItems:'center'}}>                            
                            <img src={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].IMG_LOGO} alt='logo' style={{width:'100%', maxHeight:'100%'}} /> :
                        </div>
                    </div>
                }

                {
                    !client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].IMG_LOGO &&
                    <div style={{position:'relative', top:'0px', left:'0px', display:'flex', width:'50%', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', width:'100px', height:'100px', justifyContent:'center', alignItems:'center'}}>
                            <i className='icon-000160-photo' style={{display:'flex', position:'absolute', alignItems:'center', bottom:'28px', fontSize:'60px', color:'#002F4E'}} />
                            <span style={{fontFamily:`${theme.fontOswald}`, fontSize:'16px', position:'absolute', display:'flex', alignItems:'center', bottom:'5px', color:'gray'}}>SUA LOGO 100x100px</span>
                         </div>
                    </div>
                }
    
                    <div style={{position:'absolute', left:'0px', display:'flex', width:'50%', justifyContent:'center', alignItems:'center'}}>
                        
                            <input 
                                type='file' 
                                id='logo'
                                placeholder=' '
                                accept='image/*'
                                onChange={(e : any) => e && fnUploadImage(e)}
                                style={{
                                        height:'100px',
                                        width:'205px',                                        
                                        cursor:'pointer',
                                        opacity:0,
                                }} 
                            />
                    </div>
                
                <div style={{display:'flex', width:'50%', flexFlow:'row wrap', height:'100px', justifyContent:'center', alignItems:'center'}}>
                    <Input 
                        label='CNPJ' 
                        value={fnMascaredCnpj(client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].CNPJ)} 
                        fnOnChange={(e) => fnOnChangeClientCompanies('CNPJ', fnMascaredCnpj(e.target.value), client.activeIndexCompany)}
                        ref={cnpjRef} 
                        width='100%'
                        fnOnPress={() => inscricaoEstadualRef.current?.focus()} 
                        isValidInput={null} 
                        placeholder={'99.999.999/9999-99'}
                        autoFocus 
                    />

                    <Input 
                        label='Inscrição Estadual' 
                        value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].INSCRICAO_ESTADUAL} 
                        fnOnChange={(e) => fnOnChangeClientCompanies('INSCRICAO_ESTADUAL', fnMascaredCep(e.target.value), client.activeIndexCompany)}
                        ref={inscricaoEstadualRef} 
                        width='100%'
                        fnOnPress={() => razaoSocialRef.current?.focus()} 
                        isValidInput={null}  
                        placeholder={''} 
                    />
                </div>

            </div>

            <Input 
                    label='Razão Social' 
                    value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].RAZAO_SOCIAL} 
                    fnOnChange={(e) => fnOnChangeClientCompanies('RAZAO_SOCIAL', e.target.value, client.activeIndexCompany)} 
                    ref={razaoSocialRef} 
                    fnOnPress={() => nomeFantasiaRef.current?.focus()}
                    isValidInput={null}
                />

                <Input 
                    label='Nome Fantasia' 
                    value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].NOME_FANTASIA} 
                    fnOnChange={(e) => fnOnChangeClientCompanies('NOME_FANTASIA', e.target.value, client.activeIndexCompany)} 
                    ref={nomeFantasiaRef} 
                    fnOnPress={() => telefoneFixoRef.current?.focus()}
                    isValidInput={null}
                />

                <SelectDefault 
                    options={companyCategory.data}
                    value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].CATEGORY} 
                    label='Categoria'                     
                    isClearable
                    ref={companyCategoryRefRef}
                    fnOnPress={() => expedientCompanyRefRef.current?.focus()}
                    fnOnChange={(e) => fnOnChangeClientCompanies('CATEGORY', e, client.activeIndexCompany)} 
                />

                <SelectDefault 
                    options={client.expedientValues}
                    value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].EXPEDIENTE} 
                    label='Expediente'                     
                    isClearable
                    width='60%'
                    ref={expedientCompanyRefRef}
                    fnOnPress={() => telefoneFixoRef.current?.focus()}
                    fnOnChange={(e) => fnOnChangeClientCompanies('EXPEDIENTE', e, client.activeIndexCompany)} 
                />

                &nbsp;&nbsp;

                <SelectDefault
                    className='select' 
                    options={client.sendOrder}
                    value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].RECEBER_PEDIDO} 
                    label='Receber Pedido'                     
                    isClearable
                    width='36%'
                    ref={expedientCompanyRefRef}
                    fnOnPress={() => telefoneFixoRef.current?.focus()}
                    fnOnChange={(e) => fnOnChangeClientCompanies('RECEBER_PEDIDO', e, client.activeIndexCompany)} 
                />

                <Input 
                    label='Telefone Fixo' 
                    value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].TELEFONE_FIXO_EMPRESA} 
                    fnOnChange={(e) => fnOnChangeClientCompanies('TELEFONE_FIXO_EMPRESA', e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4'), client.activeIndexCompany)} 
                    ref={telefoneFixoRef} 
                    fnOnPress={() => celularWhatzappRef.current?.focus()}
                    isValidInput={null}
                    width='48.54%'
                    icon='000258-telephone'
            />

            <Input 
                label='Whatzap da Empresa' 
                value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].CELULAR_WHATZAPP_EMPRESA} 
                fnOnChange={(e) => fnOnChangeClientCompanies('CELULAR_WHATZAPP_EMPRESA', e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4'), client.activeIndexCompany)} 
                ref={celularWhatzappRef} 
                fnOnPress={() => emailEmpresaRefRef.current?.focus()}
                isValidInput={null}
                width='48.54%'
                icon='000297-whatsapp'
            />

            <Input 
              label='E-mail empresa' 
              value={client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].EMAIL_EMPRESA} 
              fnOnChange={(e) => fnOnChangeClientCompanies('EMAIL_EMPRESA', e.target.value.toLowerCase(), client.activeIndexCompany)}
              ref={emailEmpresaRefRef} 
              fnOnPress={() => cnpjRef.current?.focus()}
              isValidInput={null}
              icon='000001-email'
            />  
            <ClientAddressPj />

          <ContainerButtons>
            <ButtonDefault label='VOLTAR' bg='red' icon='icon-000022-arrow-left' onClick={() => fnBackCompanyList()} />
            <ButtonDefault label='SALVAR' bg='green' icon='icon-000056-cloud' onClick={() => fnSubmit()} className={(message.isLoading) && 'button-disable'} />
          </ContainerButtons>
        </div>
    )
}