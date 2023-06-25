import { useRef } from 'react'
import { ContainerCard, ContainerLocal, MapAddress, LabelAddress, TextAddress, ContainerCheckbox, IconActiveAddress, Draft, ContainerButtonTrash, ButtonIconTrash, TextTooltipTrash, ContainerButtons } from '../styles'
import { messageStore, clientStore, addressStore, layoutStore, marlimThemeStore, modalStore } from '../../../../store/index'
import { ButtonDefault, Input, FormDefault, StrongText, Checkbox, ButtonIcon } from '../../../default/index'
import AddressRegistration from'../../address/AddressRegistration'
import AddressCustomRegistration from'../../address/AddressCustomRegistration'
import { useClient } from '../../../../hooks'

export default function ClientAdressesPj()  {
    
    // Store
    const client = clientStore(state => state)
    const message = messageStore(state => state)
    const modal = modalStore(state => state)
    const address = addressStore(state => state)
    const layout = layoutStore(state => state)
    const marlimTheme1 = marlimThemeStore(state => state)

    // Ref    
    const numberResidClientRef = useRef<HTMLInputElement>(null)
    const complementClientRef = useRef<HTMLInputElement>(null)

    const { fnSubmitClient, fnOnChangeClientDataRegister } = useClient()

    const fnOpenAddress = () => {
        address.fnResetAddress();
        layout.fnOnChangeLayout('isBlock', true)
        address.fnOnChangeAddress('screenOpen', true)
        address.fnOnChangeAddress('visibleButtonSave', false)        
        client.fnOnChange('addressNumber', '')
        client.fnOnChange('addressComplement', '')
        client.fnOnChange('typeResid', '')
        client.fnOnChange('isTypeHome', false)
        client.fnOnChange('isTypeApt', false)
    }

    const fnAddAddressCompany = () => {        
        let _ENDERECOS_EMPRESA = client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA
        let _totalAddress = client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA.length
        
        let _obj = {
            CEP: address.zipCode,            
            PAIS: address.country,
            //@ts-ignore
            ESTADO: address.uf.label? address.uf.label : address.uf,            
            //@ts-ignore
            MUNICIPIO: address.city.label? address.city.label : address.city,            
            //@ts-ignore
            BAIRRO: address.neighBorhood.label? address.neighBorhood.label : address.neighBorhood,
            LOGRADOURO: address.locale,
            ENDERECO_NUMERO: client.addressNumber,
            TIPO_RESIDENCIA: client.isTypeHome? 'CASA' : 'APT',            
            ENDERECO_COMPLEMENTO: client.addressComplement,
            //@ts-ignore
            ENDERECO_ATIVO: _totalAddress == 0? true : false,
        }
        _ENDERECOS_EMPRESA.push(_obj)
        address.fnOnChangeAddress('screenOpen', false);
        layout.fnOnChangeLayout('isBlock', false);
        
    }

    const fnDeleteAddress = (i : number) => {
        let _addressCompany = client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA
        _addressCompany.map((res : any) => res.ENDERECO_ATIVO = true)
        _addressCompany.splice(i, 1)        
        fnOnChangeClientDataRegister('dataRegister', client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany])
    }

    const ModalAlterAddress = (props : any) => {

        const fnAlterAddress = () => {
            //@ts-ignore
            let _addressRegistration = client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA
            //@ts-ignore
            _addressRegistration[1].ENDERECO_ATIVO = true
            //@ts-ignore
            _addressRegistration[1].ENDERECO_ATIVO = false
            _addressRegistration.splice(0, 2, _addressRegistration[1], _addressRegistration[0])
                        
            //@ts-ignore
            if(client.dataRegister._id) {
                fnSubmitClient()    
            }
            modal.fnClose()
        }

        return (            
            <FormDefault>
                <div style={{display:'flex', padding:'10px', flexFlow:'row wrap'}}>
                    <div style={{display:'flex', color:'black', fontFamily:'arial', fontWeight:'bold', fontSize:'18px', alignItems:'center', justifyContent:'center', flexFlow:'row wrap', width:'100%'}}>
                        <p style={{width:'100%', padding:'10px', textAlign:'center'}}>Quero este endereço como o principal!</p>
                    </div>
                    <div style={{display:'flex', color:'black', backgroundColor:'white', fontSize:'17px', width:'100%', alignItems:'center'}}>
                        <p style={{textAlign:'center', padding:'15px', margin:'10px', borderRadius:'5px', width:'100%', border:'solid 2px #002F4E'}}> 
                            {props.data.LOGRADOURO}, <b>nº</b> {props.data.ENDERECO_NUMERO}, <b>{props.data.BAIRRO}</b>,  <br /> {props.data.MUNICIPIO}, {props.data.ESTADO} - {props.data.CEP}
                        </p>
                    </div>
                    <ContainerButtons style={{padding:'10px'}}>
                        <ButtonDefault label='VOLTAR' bg='red' icon='icon-000022-arrow-left' onClick={() => { modal.fnClose()}} />
                        <ButtonDefault label='CONFIRMAR' bg='green' icon='icon-000024-arrows-compress' onClick={() => fnAlterAddress()} />
                    </ContainerButtons>
                </div>
            </FormDefault>
        )
    }


    return (
            <>
                <ContainerCard>

                    {
                        client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA.length > 0 &&
                        <LabelAddress>Endereço(s) da Empresa</LabelAddress>
                    }
                    
                    {
                        client.dataRegister[0]
                            .CLIENTE_EMPRESAS[client.activeIndexCompany]
                            .ENDERECOS_EMPRESA                            
                            .map((res : any, i : number) => {
                                let totalRegister = client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA.length
                            return (
                                <MapAddress totalRegister={totalRegister} key={i} activeAddress={res.ENDERECO_ATIVO} className={`map-${i}`} onClick={() => {!res.ENDERECO_ATIVO && modal.fnOpen();  !res.ENDERECO_ATIVO && modal.fnOnChangeModal('component', <ModalAlterAddress activeAddress={i} data={res} />)}}>                                    
                                        {
                                            res.ENDERECO_ATIVO && 
                                            <IconActiveAddress>&#10003;</IconActiveAddress>
                                        }

                                        <TextAddress> 
                                            {res.LOGRADOURO}, &nbsp; 
                                            <b>nº</b>&nbsp; {res.ENDERECO_NUMERO}, &nbsp; 
                                            <b>{res.BAIRRO},</b> &nbsp;
                                            {res.MUNICIPIO}, &nbsp;
                                            {res.ESTADO} - &nbsp; 
                                            {res.CEP} &nbsp;
                                        </TextAddress>
                                        
                                        <ContainerButtonTrash className='display-block'>
                                            <ButtonIconTrash onClick={(e) => {e.stopPropagation(); fnDeleteAddress(i)}}>
                                                <TextTooltipTrash className='display-block'>Deletar endereço</TextTooltipTrash>
                                                &#128465;
                                            </ButtonIconTrash>
                                        </ContainerButtonTrash>
                                </MapAddress>
                            )
                        })
                }

                {
                    address.screenOpen &&
                    <ContainerLocal>
                        <FormDefault>
                            <StrongText height='75px' bg='#002F4E' title='CADASTRO DE ENDEREÇO DE EMPRESA' subTitle='Controle Geral de Endereços Empresárial' />
                            {
                                address.cepManual == 'sim'?  
                                <AddressCustomRegistration /> : 
                                <AddressRegistration />
                            }

                            <div style={{display:'flex', width:'100%', padding:'10px', flexFlow:'row wrap'}}>
                                <Input 
                                    label='Nº' 
                                    value={client.addressNumber} 
                                    fnOnChange={(e) => client.fnOnChange('addressNumber', e.target.value)} 
                                    width='100px'
                                    ref={numberResidClientRef}                        
                                    fnOnPress={() => complementClientRef.current?.focus()}
                                    //isValidInput={null}
                                />
                                
                                <ContainerCheckbox>                        
                                    <Checkbox label='CASA' checked={client.isTypeHome} onChange={() => {client.fnOnChange('isTypeHome', !client.isTypeHome); client.fnOnChange('isTypeApt', false)}} />
                                    <Checkbox label='APARTAMENTO' checked={client.isTypeApt} onChange={() => {client.fnOnChange('isTypeApt', !client.isTypeApt); client.fnOnChange('isTypeHome', false)}} />
                                </ContainerCheckbox>

                                <Input 
                                    label='Complemento' 
                                    value={client.addressComplement} 
                                    fnOnChange={(e) => client.fnOnChange('addressComplement', e.target.value)}
                                    ref={complementClientRef} 
                                />
                                <ContainerButtons style={{padding:'10px'}}>
                                    <ButtonDefault label='VOLTAR' bg='red' icon='000022-arrow-left' onClick={() => { address.fnOnChangeAddress('screenOpen', false); layout.fnOnChangeLayout('isBlock', false)}} />
                                    <ButtonDefault label='ADICIONAR' bg='green' icon='icon-000139-page-add' onClick={() => fnAddAddressCompany()} />
                                </ContainerButtons>
                            </div>
                            
                        </FormDefault>
                    </ContainerLocal>
                }
            </ContainerCard>

            {
                client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany].ENDERECOS_EMPRESA.length < 2 &&
                <div style={{width:'100%', padding:'5px'}}>
                    <ButtonIcon icon='icon-000125-marker' label={'ADICIONAR ENDEREÇO DA EMPRSA'} onClick={() => fnOpenAddress()} />
                </div>
            }
        </>
    )
}