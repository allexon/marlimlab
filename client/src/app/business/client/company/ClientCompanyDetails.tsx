import { ContainerDetails, ContainerValues, ContainerField, FieldLabel, FieldValue, SubField, SubLabel, SubValue } from '../styles'
import { clientStore } from '../../../../store/index'
import { fnMascaredCell } from '../../../../functions/index'

export default function ClientCompanyDetails()  {
    
    // Store
    const client = clientStore(state => state)

    const fnRender = () => {
            let _data: any =  client.dataRegister[0].CLIENTE_EMPRESAS[client.activeIndexCompany]            
            const {...values } = _data
        return (            
            <ContainerDetails>
            
                <ContainerValues>
                <ContainerField align='center'>
                        <FieldLabel style={{width:'100%', justifyContent:'center'}}>LOGO</FieldLabel>
                        <FieldValue><img src={values.IMG_LOGO} alt='logo' /></FieldValue>
                    </ContainerField>

                    {/* <ContainerField width='50%' className='custom-container-field'>
                        <div style={{display:'flex', flexFlow:'column wrap',  justifyContent:'flex-start', alignItems:'center', backgroundColor:'white', padding:'10px', marginBottom:'10px', borderRadius:'5px', height:'95%', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 15px 3px'}}>
                            <FieldLabel>Horário de Funcionamentro</FieldLabel>
                            <FieldValue>08:00 ás 12:00 - 14:00 ás 18:00</FieldValue>
                        </div>
                    </ContainerField> */}

                    <ContainerField>                    
                        <FieldLabel>Razão Social:</FieldLabel>
                        <FieldValue>{values.RAZAO_SOCIAL}</FieldValue>                        
                    </ContainerField>

                    <ContainerField>
                        <FieldLabel>Nome Fantasia:</FieldLabel>
                        <FieldValue>{values.NOME_FANTASIA}</FieldValue>
                    </ContainerField>

                    <ContainerField style={{flexFlow:'row noWrap'}}>
                        <FieldLabel>Expediente:</FieldLabel>
                        <FieldValue>{values.EXPEDIENTE?.label}</FieldValue>
                        <FieldLabel>Receber Pedido:</FieldLabel>
                        <FieldValue><b style={{fontWeight:'bold', fontSize:'18px', color:'orange'}}>{values.RECEBER_PEDIDO?.label}</b></FieldValue>
                    </ContainerField>

                    <ContainerField>
                        <FieldLabel>Categoria:</FieldLabel>
                        <FieldValue>{values.CATEGORY?.label}</FieldValue>
                    </ContainerField>

                    <ContainerField>
                        <FieldLabel>Telefone Fixo:</FieldLabel>
                        <FieldValue>{values.TELEFONE_FIXO_EMPRESA}</FieldValue>
                    </ContainerField>

                    <ContainerField>
                        <FieldLabel>Whatzap:</FieldLabel>
                        <FieldValue>{fnMascaredCell(values.CELULAR_WHATZAPP_EMPRESA)}</FieldValue>
                    </ContainerField>
                
                    {
                        values.ENDERECOS_EMPRESA.map((res: any, i : number) => (
                            <ContainerField className={`container-field-${i}`} key={i}>
                                
                                <SubField>
                                    <SubLabel>Cep:</SubLabel>
                                    <SubValue>{res.CEP}</SubValue>
                                </SubField>

                                <SubField>
                                    <SubLabel>Pais:</SubLabel>
                                    <SubValue>{res.PAIS}</SubValue>
                                </SubField>

                                <SubField>
                                    <SubLabel>Estado:</SubLabel>
                                    <SubValue>{res.ESTADO}</SubValue>
                                </SubField>

                                <SubField style={{width:'100%'}}>
                                    <SubLabel>Municipio:</SubLabel>
                                    <SubValue>{res.MUNICIPIO}</SubValue>    
                                </SubField>

                                <SubField style={{width:'100%'}}>
                                    <SubLabel>Bairro:</SubLabel>
                                    <SubValue>{res.BAIRRO}</SubValue>
                                </SubField>

                                <SubField>
                                    <SubLabel>Logradouro:</SubLabel>
                                    <SubValue>{res.LOGRADOURO}<b style={{padding:'0px 5px 0px 5px'}}>nº</b>{res.ENDERECO_NUMERO}</SubValue>
                                </SubField>
    
                                <SubField style={{width:'100%'}}>
                                    <SubLabel>Tipo de Residência:</SubLabel>
                                    <SubValue>{res.TIPO_RESIDENCIA} {res.ENDERECO_ATIVO && res.ENDERECO_ATIVO? <b style={{color:'orange', fontWeight:'bold'}}>(Endereço Principal)</b> : ''}</SubValue>
                                </SubField>

                            </ContainerField>
                        ))
                    }
                </ContainerValues>
            </ContainerDetails>
        )
    }
    
    return (
        fnRender()
    )
}