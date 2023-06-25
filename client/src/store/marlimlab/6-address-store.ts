import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IAddress {
    
    // VALUE FIELDS
    _id: string | null,
    id: string | null,
    zipCode: string,
    country: string,
    uf: string,
    city: string,
    neighBorhood: string,
    locale: string,    
    tagState: string,
    lat: string,
    lon: string,
    ibgeCode: string,
    ibgeDDD: string,
    ibgeSiafi: string

    // list
    list: any[],
    statelist: any[],
    addressList: any[],
    cepData: null,
    cepError: null,
    cepManual: string,
    ufs: any[],
    cities: any[],
    neighborhoods: any[],
                        
    // IO COMMANDS
    IO_ADDRESS_NEW_UPDATE: string,    
    IO_ADDRESS_FIND: string,
    IO_ADDRESS_LIST: string,
    IO_ADDRESS_UF_LIST: string,
    IO_ADDRESS_MUNICIPIO_LIST: string,
    IO_ADDRESS_BAIRROS_LIST: string,
        
    // VALIDATE FIELDS    
    isValidZipCode: boolean | null,
    isValidCountry: boolean | null
    isValidState: boolean | null,
    isValidCity: boolean | null,    
    isValidNeighBorhood: boolean | null,
    isValidlocale: boolean | null,
    isValidLat: boolean | null,
    isValidLon: boolean | null,

    // CONTROLL
    visibleButtonSave: boolean,
    screenOpen: boolean,

    // FUNCTIONS
    fnOnChangeAddress: (field: string, value: any) => void,
    fnResetAddress: () => void,
}

const stateDefault = {

    // VALUE FIELDS
    _id: null,
    id: null,
    zipCode: '',
    country: '',
    uf: '',
    city: '',
    neighBorhood: '',
    locale: '',
    tagState: '', // ES, SP, BA, etc....
    lat: '',
    lon: '',    
    ibgeCode: '',
    ibgeDDD: '',
    ibgeSiafi: '',

    // list
    list: [],
    statelist: [],
    addressList: [],    
    cepData: null,
    cepError: null,
    cepManual: '',
    ufs: [],
    cities: [],
    neighborhoods: [],
                    
    // IO COMMANDS
    IO_ADDRESS_NEW_UPDATE: 'IO_ADDRESS_NEW_UPDATE',    
    IO_ADDRESS_FIND: 'IO_ADDRESS_FIND',
    IO_ADDRESS_LIST: 'IO_ADDRESS_LIST',
    IO_ADDRESS_UF_LIST: 'IO_ADDRESS_UF_LIST',
    IO_ADDRESS_MUNICIPIO_LIST: 'IO_ADDRESS_MUNICIPIO_LIST',
    IO_ADDRESS_BAIRROS_LIST: 'IO_ADDRESS_BAIRROS_LIST',
        
    // VALIDATE FIELDS    
    isValidZipCode: null,    
    isValidCountry: null,
    isValidState: null,
    isValidCity: null, 
    isValidNeighBorhood: null,   
    isValidlocale: null,
    isValidLat: null,   
    isValidLon: null,
    isValidIIbgeCode: '',
    isValidIbgeDDD: '',
    isValidIbgeSiafi: '',

    // controll
    screenOpen: false,
    visibleButtonSave: true    
}

let store = ((set : any) => ({
    ...stateDefault,    
    fnOnChangeAddress: (field:string, value: string) => set((state : any)  => ({...state, [field]:value })),
    fnResetAddress: () => set({...stateDefault})
}))

export const addressStore = create(
    persist<IAddress>(
        (store), 
        {name:'adress-storage', storage: createJSONStorage(() => localStorage)}
    )
)