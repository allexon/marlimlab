import { useEffect, useRef } from 'react'
import axios from 'axios'
import { ContainerRegistration, ContainerButtons } from './styles'
import { gasStore, messageStore, clientStore, marlimThemeStore, companyCategoryStore } from '../../../store/index'
import { ButtonDefault, Input, SelectDefault } from '../../default/index'
import { fnFormatBrCoin, socket, fnBrToUsdCoin } from '../../../functions/index'
import { useClient } from '../../../hooks'

export default function ProductRevendaGasRegistration() {
    
    // Store
    const gas = gasStore(state => state)
    const client = clientStore(state => state)
    const message = messageStore(state => state)
    const theme = marlimThemeStore(state => state)
    const companyCategory = companyCategoryStore(state => state)

    // ap env consumer
    // Define as rotas da API
    const api = {
        companyCategories: import.meta.env.VITE_HTTP_LOCAL_COMPANY_CATEGORIES,
        productTypes: import.meta.env.VITE_HTTP_LOCAL_PRODUCT_TYPES,
    }
    
    // Ref
    const gasProductDescriptionRef: any = useRef<HTMLInputElement>(null)
    const gasProductValueRef: any = useRef<HTMLInputElement>(null)
    const gasProductTypeRef: any = useRef<HTMLInputElement>(null)    
    const gasProductCompaniesRef: any = useRef<HTMLInputElement>(null)
                       
    useEffect(() => {        
        fnGetCompanyCategories()
        fnGetProductTypes()
        fnGetCompanies()
    }, [])

    const fnGetCompanyCategories = async () => {
        const _res = await axios.get(api.companyCategories)        
        gas.fnOnChangeGasProduct('companyCategories', _res.data)
    }

    const fnGetProductTypes = async () => {
        const _res = await axios.get(api.productTypes)
        gas.fnOnChangeGasProduct('productTypes', _res.data)
    }

    const fnGetCompanies = async () => {
        let _array: any = []
        
        client.list.map((res : any) => {
            let _id = res._id
            let _CLIENTE_ID = res.CLIENTE_ID            
            
            if(res.CLIENTE_EMPRESAS.length > 0) {
                res.CLIENTE_EMPRESAS.map((res : any) => {
                    _array.push({
                        label: res.NOME_FANTASIA,
                        value: _id,
                        CLIENTE_id: _id,
                        CLIENTE_ID:_CLIENTE_ID,
                        CLIENTE_EMPRESA_NOME_FANTASIA: res.NOME_FANTASIA,
                        CLIENTE_EMPRESA_CATEGORIA: res.CATEGORY,
                        CLIENTE_EMPRESA_CNPJ: res.CNPJ
                    })
                })
            }            
        })
        gas.fnOnChangeGasProduct('companies', _array)
    }

    const fnUploadImage = async (e : any) => {
        e.preventDefault()

        if(e.target.files[0]) {
            let _file = e.target.files[0]
            const reader = new FileReader
            reader.readAsDataURL(_file)

            reader.onload = () => {                
                gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_IMG', reader.result)
            }
        } else {
            console.log(':: NENHUM AQUIVO FOI SELECIONADO')
        } // end
        
    }

    const fnValidFields = () => {        
        let _errors: any[]
        let _hasError: boolean = false
        _errors = [
            {id:1, error: gas.PRODUTO_REVENDA_GAS_DESCRICAO?.trim() == '', message:<span>Por favor informe o <b>[ DESCRIÇÃO DO PRODUTO ]</b></span>},
        ]
        let _errorsFilter = _errors.filter(res => res.error)
        
        _errorsFilter = _errorsFilter.sort((a, b) => {return a.id - b.id})
        
        let _stop = false
        _errorsFilter.map(res => {if(_stop) {return}
            if(res.error) {
                message.fnError(res.message)
                _hasError = true
                _stop = true
            }
        })
        return _hasError
    }

    const fnSubmit = () => {
        if(fnValidFields()) {return}        
        console.log('--- submit ---')
        let _data: any = []

        _data.push({
            PRODUTO_REVENDA_GAS_DESCRICAO: gas.PRODUTO_REVENDA_GAS_DESCRICAO,
            PRODUTO_REVENDA_GAS_VALOR: gas.PRODUTO_REVENDA_GAS_VALOR.split(' ')[1],
            PRODUTO_REVENDA_GAS_REVENDA_GAS_IMG: gas.PRODUTO_REVENDA_GAS_IMG,
            PRODUTO_REVENDA_GAS_TIPO: gas.activeProductType,
            PRODUTO_REVENDA_GAS_EMPRESA: gas.activeCompany,
            PRODUTO_REVENDA_GAS_DATA_REGISTRO: '',
            PRODUTO_REVENDA_GAS_DATA_ATUALIZACAO: ''
        })

        console.log('----- SUBMIT -->', _data)

        socket.emit(gas.IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, {..._data[0]})
        socket.on(gas.IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, (res : any) => {
            if(res.type == 'success') {
                //fnGetClientList()                
                message.fnSuccess(res.message)
            } else {
                if(res.type == 'error') {
                    console.log('----- error ->', res.error)
                    //@ts-ignore
                    message.fnError(res.message)
                } else {                    
                    //@ts-ignore
                    message.fnInfo(res.message)
                }
            }
        })
    }

    return (
        <ContainerRegistration>
            <div style={{margin:'5px 0px 5px 0px', display:'flex', position:'relative', flex:1, height:'100px', flexFlow:'row nowrap', justifyContent:'center', alignItems:'center'}}>

                {/* Exibe isto quando tem imagem */}
                {
                    gas.PRODUTO_REVENDA_GAS_IMG &&
                    <div style={{position:'relative', top:'0px', left:'0px', display:'flex', width:'50%', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', width:'100px', height:'100px', justifyContent:'center', alignItems:'center'}}>                            
                            <img src={gas.PRODUTO_REVENDA_GAS_IMG} alt='logo' style={{width:'100%', maxHeight:'100%'}} /> :
                        </div>
                    </div>
                }

                {/* Exibe isto quando não tem imagem */}
                {
                    !gas.PRODUTO_REVENDA_GAS_IMG &&
                    <div style={{position:'relative', top:'0px', left:'0px', display:'flex', width:'50%', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', width:'100px', height:'100px', justifyContent:'center', alignItems:'center'}}>
                            <i className='icon-000160-photo' style={{display:'flex', position:'absolute', alignItems:'center', bottom:'28px', fontSize:'60px', color:'#002F4E'}} />
                            <span style={{fontFamily:`${theme.fontOswald}`, fontSize:'16px', position:'absolute', display:'flex', alignItems:'center', bottom:'5px', color:'gray'}}>SUA LOGO 100x100px</span>
                         </div>
                    </div>
                }
    
                {/* LOAD IMAGEM */}
                <div style={{position:'absolute', left:'0px', display:'flex', width:'50%', justifyContent:'center', alignItems:'center'}}>                        
                    <input 
                        type='file' 
                        id='logo'
                        placeholder=' '
                        accept='image/*'
                        onChange={(e : any) => e && fnUploadImage(e)}
                        style={{height:'100px', width:'205px', cursor:'pointer', opacity:0}} 
                    />
                </div>
                
                {/* <div style={{display:'flex', width:'50%', flexFlow:'row wrap', height:'100px', justifyContent:'center', alignItems:'center'}}>
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
                </div> */}

            </div>

            <SelectDefault
                label='Empresa'
                options={gas.companies}
                value={gas.activeCompany}                
                ref={gasProductCompaniesRef}
                fnOnPress={() => gasProductDescriptionRef.current?.focus()}
                fnOnChange={(e) => {
                    console.log('--- active company -->', e)
                    gas.fnOnChangeGasProduct('activeCompany', e)
                }}
                isClearable
            />

            <Input 
                label='Descrição do Produto'
                value={gas.PRODUTO_REVENDA_GAS_DESCRICAO}  
                fnOnChange={(e) => gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_DESCRICAO', e.target.value.toUpperCase())} 
                ref={gasProductDescriptionRef} 
                fnOnPress={() => gasProductValueRef.current?.focus()}                 
                isValidInput={null}
                width='100%'
                // disabled={true}
            />

            <SelectDefault 
                label='Tipo de Produto'
                options={gas.productTypes}
                value={gas.activeProductType}                
                ref={gasProductTypeRef}
                fnOnPress={() => gasProductValueRef.current?.focus()}
                fnOnChange={(e) => gas.fnOnChangeGasProduct('activeProductType', e)}
                width='60%'
                isClearable
            />

            &nbsp;&nbsp;

            <Input 
                label='Valor do Produto'
                value={gas.PRODUTO_REVENDA_GAS_VALOR}
                fnOnChange={(e) => gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_VALOR', fnFormatBrCoin(e.target.value))} 
                ref={gasProductValueRef} 
                fnOnPress={() => gasProductDescriptionRef.current?.focus()}
                isValidInput={null} 
                width='157px'
                align='right'
                // disabled={true}
            />

          <ContainerButtons>
            <ButtonDefault label='VOLTAR' bg='red' icon='icon-000022-arrow-left' onClick={() => null} />
            <ButtonDefault label='SALVAR' bg='green' icon='icon-000056-cloud' onClick={() => fnSubmit()} className={(message.isLoading) && 'button-disable'} />            
          </ContainerButtons>
        {/* </div> */}
    </ContainerRegistration>
    )
}