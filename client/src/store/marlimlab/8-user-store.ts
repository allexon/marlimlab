import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IUser {

    // VALUE FIELD
    _id: string | null,
    id: string | null,
    name: string,    
    cpf: string,        
    email: string,
    password: string,    
    confirmPassword: string,
    list: any[],
    redirect: boolean,
    data: string[],
    cell: string,
    rg: string,
    rgLocal: string,
    response: string,
    activeTab:number,
    title: string,
    subTitle: string,

    // Dados Pessoa Jurídica
    company: string,
    cnpj: string,
    regState: string,

    // Campos Endereço
    address: string[],
    activeAddress: boolean,
    zipCode: string,
    addressNumber: string,
    checkTypeResident: number | null,
    publicArea: string,
    publicAreaFull: string,
    neighBorhood: string,
    city: string,
    state: string,
    tagState: string,
    country: string,
    lat: string,
    long: string,
    
    // IO COMMANDS
    IO_USER_NEW: string,
    IO_USER_UPDATE: string,
    IO_USER_LIST: string,
        
    // VALIDATE FIELDS
    isValidName: boolean | null,    
    isValidPassword: boolean | null,
    isValidConfirmPassword: boolean | null,
    isValidEmail: boolean | null,
    isValidCpf: boolean | null,    
    isValidCell: boolean | null,
    isValidRg: boolean | null
    isValidZipCode: boolean | null,
    isValidPublicAreaFull: boolean | null,
    isValidNeighBorhood: boolean | null,
    isValidCity: boolean | null,    
    isValidState: boolean | null,
    isValidCountry: boolean | null
    
    fnOnChangeUser: (field: string, value:any) => void,
    fnResetUser: () => void,
}

const stateDefault = {

    // ***** VALUE FIELD *****
    _id: null,
    id: null,
    name: '',    
    cpf: '',        
    email: '',
    password: '',    
    confirmPassword: '',
    list: [],
    redirect: false,
    data: [],
    cell: '',
    rg: '',
    rgLocal: '',
    response: '',
    address: [], 
    activeAddress: false,   
    zipCode: '',
    addressNumber: '',
    checkTypeResident: null,
    publicArea: '',
    publicAreaFull: '',
    neighBorhood: '',
    city: '',
    state: '',
    tagState: '',
    country: '',
    lat: '',
    long: '',
    activeTab:0,

    //Dados Pessoa Jurídica
    company: '',
    cnpj: '',
    regState: '',

    // *****  IO COMMANDS *****
    IO_USER_NEW: 'IO_USER_NEW',
    IO_USER_UPDATE: 'IO_USER_UPDATE',
    IO_USER_LIST: 'IO_USER_LIST',
        
    // ***** VALIDATE FIELDS *****
    title: 'CADASTRO DE USUÁRIOS',
    subTitle: 'Gestão de usuários',
    isValidName: null,    
    isValidPassword: null,
    isValidConfirmPassword: null,
    isValidEmail: null,
    isValidCpf: null,    
    isValidCell: null,
    isValidRg: null,
    isValidZipCode: null,
    isValidPublicAreaFull: null,
    isValidNeighBorhood: null,
    isValidCity: null,    
    isValidState: null,
    isValidCountry: null
}

let store = ((set : any) => ({
    ...stateDefault,
    fnOnChangeUser: (field:string, value:any) => set((state : any)  => ({...state, [field]:value })),
    fnResetUser: () => set({...stateDefault})
}))

export const userStore = create(
    persist<IUser>(
        (store), 
        {name:'user-storage', storage: createJSONStorage(() => localStorage)}
    )
)