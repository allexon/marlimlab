import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IGas {
    
    _id: string | null,
    PRODUTO_REVENDA_GAS_ID: number,
    PRODUTO_REVENDA_GAS_DESCRICAO: string,
    PRODUTO_REVENDA_GAS_VALOR: string,
    PRODUTO_REVENDA_GAS_IMG: undefined,
    PRODUTO_REVENDA_GAS_DATA_REGISTRO: string,
    PRODUTO_REVENDA_GAS_DATA_ATUALIZACAO: string,
    PRODUTO_REVENDA_GAS_CLIENTE_ID: string,
    PRODUTO_REVENDA_GAS_EMPRESA: string,
    PRODUTO_REVENDA_GAS_EMPRESA_CNPJ: string,
    
    // IO COMUNICATION
    IO_PRODUCT_REVENDA_GAS_NEW_UPDATE: string,
    IO_PRODUCT_REVENDA_GAS_FIND: string,
    IO_PRODUCT_REVENDA_GAS_LIST: string,
    
    // CONTROLL
    companies: any[],
    activeCompany: null,

    productTypes: any[],
    activeProductType: null,
    
    list: any[],
    isVisibleForm: boolean    
    
    // FUNCTIONS
    fnOnChangeGasProduct: (field: string, value:any) => void,
    fnResetGasProduct: () => void,
}

const stateDefault = {
    
    _id: null,
    PRODUTO_REVENDA_GAS_ID: 0,
    PRODUTO_REVENDA_GAS_DESCRICAO: '',
    PRODUTO_REVENDA_GAS_VALOR: '',
    PRODUTO_REVENDA_GAS_IMG: undefined,
    PRODUTO_REVENDA_GAS_DATA_REGISTRO: '',
    PRODUTO_REVENDA_GAS_DATA_ATUALIZACAO: '',
    PRODUTO_REVENDA_GAS_CLIENTE_ID: '',
    PRODUTO_REVENDA_GAS_EMPRESA: '',
    PRODUTO_REVENDA_GAS_EMPRESA_CNPJ: '',

    // IO COMUNICATION
    IO_PRODUCT_REVENDA_GAS_NEW_UPDATE: 'IO_PRODUCT_REVENDA_GAS_NEW_UPDATE',
    IO_PRODUCT_REVENDA_GAS_FIND: 'IO_PRODUCT_REVENDA_GAS_FIND',
    IO_PRODUCT_REVENDA_GAS_LIST: 'IO_PRODUCT_REVENDA_GAS_LIST',

    // CONTROLL
    companies: [],
    activeCompany: null,

    productTypes: [],
    activeProductType: null,

    list: [],
    isVisibleForm: false    
}

let store = ((set : any) => ({
    ...stateDefault,

    fnOnChangeGasProduct: (field:string, value: any) => {
        set((state : any) => {
            return ({...state, [field]: value })
        })
    },

    fnResetGasProduct: () => {
        set((state : any) => {            
            return ({...stateDefault})
        })
    }
    
}))

export const gasStore = create(
    persist<IGas>((store), 
        {name:'gas-storage', storage: createJSONStorage(() => localStorage)}
    )
)