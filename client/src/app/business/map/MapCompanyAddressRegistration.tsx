import axios from 'axios'
import { ContainerRegistration, ContainerButtons } from './styles'
import { mapStore, clientStore, messageStore } from '../../../store/index'
import { ButtonDefault, Input, SelectDefault } from '../../default/index'
import { useEffect } from 'react'

export default function MapCompanyAddressRegistration() {
    
    // Store
    const map = mapStore(state => state)
    const client = clientStore(state => state)
    const message = messageStore(state => state)

    useEffect(() => {
        fnGetEstados()
        fnGetMunicipios()
        fnGetBairros()
    }, [])
    
    const fnValidFields = () => {        
        // let _errors: any[]
        // let _hasError: boolean = false
        // _errors = [
        //     {id:1, error: gas.PRODUTO_REVENDA_GAS_DESCRICAO?.trim() == '', message:<span>Por favor informe o <b>[ DESCRIÇÃO DO PRODUTO ]</b></span>},
        // ]
        // let _errorsFilter = _errors.filter(res => res.error)
        
        // _errorsFilter = _errorsFilter.sort((a, b) => {return a.id - b.id})
        
        // let _stop = false
        // _errorsFilter.map(res => {if(_stop) {return}
        //     if(res.error) {
        //         message.fnError(res.message)
        //         _hasError = true
        //         _stop = true
        //     }
        // })
        // return _hasError
    }

    const fnSubmit = () => {
        // if(fnValidFields()) {return}        
        // console.log('--- submit ---')
        // let _data: any = []

        // _data.push({
        //     PRODUTO_REVENDA_GAS_DESCRICAO: gas.PRODUTO_REVENDA_GAS_DESCRICAO,
        //     PRODUTO_REVENDA_GAS_VALOR: gas.PRODUTO_REVENDA_GAS_VALOR.split(' ')[1],
        //     PRODUTO_REVENDA_GAS_REVENDA_GAS_IMG: gas.PRODUTO_REVENDA_GAS_IMG,
        //     PRODUTO_REVENDA_GAS_TIPO: gas.activeProductType,
        //     PRODUTO_REVENDA_GAS_EMPRESA: gas.activeCompany,
        //     PRODUTO_REVENDA_GAS_DATA_REGISTRO: '',
        //     PRODUTO_REVENDA_GAS_DATA_ATUALIZACAO: ''
        // })

        // console.log('----- SUBMIT -->', _data)

        // socket.emit(gas.IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, {..._data[0]})
        // socket.on(gas.IO_PRODUCT_REVENDA_GAS_NEW_UPDATE, (res : any) => {
        //     if(res.type == 'success') {
        //         //fnGetClientList()                
        //         message.fnSuccess(res.message)
        //     } else {
        //         if(res.type == 'error') {
        //             console.log('----- error ->', res.error)
        //             //@ts-ignore
        //             message.fnError(res.message)
        //         } else {                    
        //             //@ts-ignore
        //             message.fnInfo(res.message)
        //         }
        //     }
        // })
    }

    const api = {
        estados: import.meta.env.VITE_HTTP_LOCAL_ESTADOS,
        municipios: import.meta.env.VITE_HTTP_LOCAL_MUNICIPIOS,
        bairros: import.meta.env.VITE_HTTP_LOCAL_BAIRROS,
    }

    const fnGetEstados = async () => {
        const _res = await axios.get(api.estados)
        map.fnOnChangeMap('estados', _res.data)
    }

    const fnGetMunicipios = async () => {
        const _res = await axios.get(api.municipios)
        map.fnOnChangeMap('municipios', _res.data)
    }

    const fnGetBairros = async () => {
        const _res = await axios.get(api.bairros)
        map.fnOnChangeMap('bairros', _res.data)
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
        map.fnOnChangeMap('companies', _array)
    }

    const fnAddRoutes = () => {
        let _mapRoutes = map.mapRoutes
        let _activeEmpresa = map.activeCompany        
        let _activeBairro = map.activeBairro //

        // @ts-ignore // Verifica se Existe Municipio pega o indice
        const _index = _mapRoutes.findIndex((obj) => obj?.MUNICIPIO === _activeBairro?.BAIRRO_CIDADE)
        console.log('::: INDEX  ->', _index)

        if (_index !== -1) {
            // O município já existe no array, então adiciona o bairro no array de bairros existente
            // @ts-ignore
            if (!_mapRoutes[_index]?.BAIRROS.includes(_activeBairro?.BAIRRO_BAIRRO)) {
                // @ts-ignore
                _mapRoutes[_index]?.BAIRROS.push(_activeBairro?.BAIRRO_BAIRRO)
            }
          } else {
            // O município não existe no array, então adiciona um novo objeto com o nome do município e o bairro
            _mapRoutes.push({
                // @ts-ignore
                CLIENTE_id: _activeEmpresa?.CLIENTE_id,
                // @ts-ignore
                CLIENTE_EMPRESA_NOME_FANTASIA: _activeEmpresa?.CLIENTE_EMPRESA_NOME_FANTASIA,
                // @ts-ignore
                CLIENTE_EMPRESA_CNPJ: _activeEmpresa?.CLIENTE_EMPRESA_CNPJ,
                PAIS: 'BRASIL',
                // @ts-ignore
                ESTADO: _activeBairro?.BAIRRO_ESTADO,
                // @ts-ignore
                MUNICIPIO: _activeBairro?.BAIRRO_CIDADE,
                // @ts-ignore
                BAIRROS: [_activeBairro?.BAIRRO_BAIRRO],
            })
          }
          map.fnOnChangeMap('mapRoutes', _mapRoutes)
    }

    console.log('::: ROTAS :::', map.mapRoutes)

    return (
        <ContainerRegistration>
            
            <SelectDefault                
                label={`${map.companies.length > 1? 'Empresas' : 'Empresa'} - ${map.companies.length}`}
                options={map.companies}
                value={map.activeCompany}                
                // ref={gasProductCompaniesRef}
                // fnOnPress={() => gasProductDescriptionRef.current?.focus()}
                fnOnChange={(e) => map.fnOnChangeMap('activeCompany', e)}
                isClearable
            />

            <SelectDefault
                label={`${map.estados.length > 1? 'Estados' : 'Estado'} - ${map.estados.length}`}
                options={map.estados}
                value={map.activeEstado}
                fnOnChange={(e) => {                    
                    map.fnOnChangeMap('activeEstado', e)

                    // Popula Municipio com estado ativo
                    map.fnOnChangeMap('activeMunicipio', null)
                    map.fnOnChangeMap('selectedMunicipios', [])
                    map.fnOnChangeMap('activeBairro', null)
                    map.fnOnChangeMap('selectedBairros', [])
                    
                    let _municipios = map.municipios
                    let _filter = _municipios.filter(res => res.CIDADE_ESTADO_ID == e.ESTADO_ID)
                    map.fnOnChangeMap('selectedMunicipios', _filter)
                }}
                isClearable
            />

            <SelectDefault
                label={`${map.selectedMunicipios.length > 1? 'Municípios' : 'Município'} - ${map.selectedMunicipios.length}`}
                options={map.selectedMunicipios}
                value={map.activeMunicipio}
                fnOnChange={(e) => {                    
                    map.fnOnChangeMap('activeMunicipio', e)

                    // Popula Bairros com municipio ativo
                    map.fnOnChangeMap('activeBairro', null)
                    let _bairros = map.bairros
                    let _filter = _bairros.filter(res => res.BAIRRO_CIDADE_ID == e.CIDADE_ID)
                    map.fnOnChangeMap('selectedBairros', _filter)
                }}
                isClearable
            />

            <SelectDefault
                label={`${map.selectedBairros.length > 1? 'Bairros' : 'Bairro'} - ${map.selectedBairros.length}`}                
                options={map.selectedBairros}
                value={map.activeBairro}
                fnOnChange={(e) => map.fnOnChangeMap('activeBairro', e)}
                isClearable
            />
          
          <ContainerButtons>
            <ButtonDefault label='ADICIONAR ROTA' bg='green' icon='icon-000056-cloud' onClick={() => fnAddRoutes()} className={(message.isLoading) && 'button-disable'} />
          </ContainerButtons>

          <ContainerButtons>
            <ButtonDefault label='VOLTAR' bg='red' icon='icon-000022-arrow-left' onClick={() => null} />
            <ButtonDefault label='SALVAR' bg='green' icon='icon-000056-cloud' onClick={() => fnSubmit()} className={(message.isLoading) && 'button-disable'} />            
          </ContainerButtons>
    </ContainerRegistration>
    )
}