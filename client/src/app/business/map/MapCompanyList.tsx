import { useEffect } from 'react'
import { ContainerList, ContainerItem, ContainerAvatar, ButtonAdd, ContainerButtonAdd, Item } from './styles'
import { mapStore, clientStore } from '../../../store/index'
import { socket, fnUsdToBrCoin } from '../../../functions'

export default function MapCompanyList() {
    
    const map = mapStore(state => state)
    const client = clientStore(state => state)
        
    useEffect(() => {
        fnGetCompanies()
        // return () => {socket.off(gas.IO_PRODUCT_REVENDA_GAS_LIST)}
    }, [])

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

    // const fnGetList = async () => {        
    //     socket.emit(gas.IO_PRODUCT_REVENDA_GAS_LIST, '')
    //     socket.on(gas.IO_PRODUCT_REVENDA_GAS_LIST, (data : any) => {            
    //         gas.fnOnChangeGasProduct('list', data)
    //     })
    // }

    const fnAdd = () => {
        // let _list = gas.list
        // gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_DESCRICAO', '')
        // gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_VALOR', '')
        // gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_IMG', '')
        // gas.fnOnChangeGasProduct('activeCompany', null)
        // gas.fnOnChangeGasProduct('activeProductType', null)        
        // gas.fnOnChangeGasProduct('list', _list);
        // gas.fnOnChangeGasProduct('isVisibleForm', true);        
    }

    const fnEdit = (i : number) => {        
         map.fnOnChangeMap('isVisibleForm', true)
        // const _activeRegister = {...gas.list[i]}        
        // let _descrption = _activeRegister.PRODUTO_REVENDA_GAS_DESCRICAO        
        // let _val = 'R$ ' + _activeRegister.PRODUTO_REVENDA_GAS_VALOR
        // let _img = _activeRegister.PRODUTO_REVENDA_GAS_REVENDA_GAS_IMG
        // let _company = _activeRegister.PRODUTO_REVENDA_GAS_EMPRESA
        // let _productType = _activeRegister.PRODUTO_REVENDA_GAS_TIPO
        
        // gas.fnOnChangeGasProduct('_id', _activeRegister._id)
        // gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_DESCRICAO', _descrption)
        // gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_VALOR', _val)
        // gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_IMG', _img)
        // gas.fnOnChangeGasProduct('activeCompany', _company)
        // gas.fnOnChangeGasProduct('activeProductType', _productType)
        // gas.fnOnChangeGasProduct('isVisibleForm', true)
    }
    
    return (                        
        <ContainerList>
            <ContainerButtonAdd>
                <ButtonAdd onClick={() => fnAdd()}>+</ButtonAdd>
            </ContainerButtonAdd>

            {
                map.companies.length > 0 &&
                map.companies.map((res : any, i) => {
                    return (
                        <ContainerItem key={i} onClick={(e) => fnEdit(i)}>
                            <Item>{res.CLIENTE_EMPRESA_NOME_FANTASIA}</Item>
                        </ContainerItem>
                    )
                })
            }
        </ContainerList>
    )
}