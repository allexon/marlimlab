import { useEffect } from 'react'
import { ContainerList, ContainerItem, ContainerAvatar, ButtonAdd, ContainerButtonAdd, Item } from './styles'
import { gasStore, layoutStore } from '../../../store/index'
import { socket, fnUsdToBrCoin } from '../../../functions'

export default function ProductRevendaGasList() {
    
    const gas = gasStore(state => state)
        
    useEffect(() => {
        fnGetList()
        return () => {socket.off(gas.IO_PRODUCT_REVENDA_GAS_LIST)}
    }, [])

    const fnGetList = async () => {        
        socket.emit(gas.IO_PRODUCT_REVENDA_GAS_LIST, '')
        socket.on(gas.IO_PRODUCT_REVENDA_GAS_LIST, (data : any) => {            
            gas.fnOnChangeGasProduct('list', data)
        })
    }

    const fnAdd = () => {
        let _list = gas.list
        gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_DESCRICAO', '')
        gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_VALOR', '')
        gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_IMG', '')
        gas.fnOnChangeGasProduct('activeCompany', null)
        gas.fnOnChangeGasProduct('activeProductType', null)        
        gas.fnOnChangeGasProduct('list', _list);
        gas.fnOnChangeGasProduct('isVisibleForm', true);        
    }

    const fnEdit = (i : number) => {        
        const _activeRegister = {...gas.list[i]}        
        let _descrption = _activeRegister.PRODUTO_REVENDA_GAS_DESCRICAO        
        let _val = 'R$ ' + _activeRegister.PRODUTO_REVENDA_GAS_VALOR
        let _img = _activeRegister.PRODUTO_REVENDA_GAS_REVENDA_GAS_IMG
        let _company = _activeRegister.PRODUTO_REVENDA_GAS_EMPRESA
        let _productType = _activeRegister.PRODUTO_REVENDA_GAS_TIPO
        
        gas.fnOnChangeGasProduct('_id', _activeRegister._id)
        gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_DESCRICAO', _descrption)
        gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_VALOR', _val)
        gas.fnOnChangeGasProduct('PRODUTO_REVENDA_GAS_IMG', _img)
        gas.fnOnChangeGasProduct('activeCompany', _company)
        gas.fnOnChangeGasProduct('activeProductType', _productType)
        gas.fnOnChangeGasProduct('isVisibleForm', true)

    }
    
    return (                        
        <ContainerList>
            <ContainerButtonAdd>
                <ButtonAdd onClick={() => fnAdd()}>+</ButtonAdd>
            </ContainerButtonAdd>

            {
                gas.list.length > 0 &&
                gas.list.map((res : any, i) => {
                    return (
                        <ContainerItem key={i} onClick={(e) => fnEdit(i)}>
                            <Item>{res.PRODUTO_REVENDA_GAS_DESCRICAO}</Item>
                        </ContainerItem>
                    )
                })
            }
        </ContainerList>
    )
}