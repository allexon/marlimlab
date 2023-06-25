import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IClient {    
    
    dataRegister: {
        _id: string | null;
        CLIENTE_ID: number;
        CLIENTE_NOME: string;
        CLIENTE_EMAIL: string;
        CLIENTE_CELULAR: string;
        CLIENTE_EMAIL_CODE: string;
        CLIENTE_DATA_REGISTRO: string;
        CLIENTE_DATA_ATUALIZACAO: string;
        CLIENTE_AVATAR: string;
        CLIENTE_CPF: string;
        CLIENTE_RG: string;
        CLIENTE_RG_LOCAL: string;

        // REDES SOCIAIS
        CLIENTE_YOUTUBE: string;
        CLIENTE_INSTAGRAM: string;
        CLIENTE_FACEBOOK: string;
        CLIENTE_LINKEDIN: string;
        CLIENTE_TWITTER: string;
        CLIENTE_WHATSAPP: string;
        
        // MEUS ENDEREÇOS PF
        CLIENTE_ENDERECOS: {
            CEP: string,
            PAIS: string,
            ESTADO: string,
            MUNICIPIO: string,
            BAIRRO: string,
            LOGRADOURO: string,
            ENDERECO_NUMERO: string,            
            TIPO_RESIDENCIA: string,
            ENDERECO_COMPLEMENTO: string,
            ENDERECO_ATIVO: boolean,
        }[];

        // MINHAS EMPRESAS
        CLIENTE_EMPRESAS: {
            RAZAO_SOCIAL: string,
            NOME_FANTASIA: string,
            CNPJ: string,            
            INSCRICAO_ESTADUAL: string,
            CATEGORY: null,
            EXPEDIENTE: null,
            RECEBER_PEDIDO: null,
            IMG_LOGO: undefined,
            YOUTUBE_EMPRESA: string,
            INSTAGRAM_EMPRESA: string,
            FACEBOOK_EMPRESA: string,
            LINKEDIN_EMPRESA: string,
            TWITTER_EMPRESA: string,
            TELEFONE_FIXO_EMPRESA: string,
            CELULAR_WHATZAPP_EMPRESA: string,
            EMAIL_EMPRESA: string,
            ENDERECOS_EMPRESA: {
                CEP: string,            
                PAIS: string,
                ESTADO: string,
                MUNICIPIO: string,
                BAIRRO: string,
                LOGRADOURO: string,
                ENDERECO_NUMERO: string,            
                TIPO_RESIDENCIA: string,
                ENDERECO_COMPLEMENTO: string,
                ENDERECO_ATIVO: boolean,
            }[]; // ENDERECOS_EMPRESA
        }[]; // CLIENTE EMPRESAS
    }[];

    // CAMPOS AUXILIARES PARA CADASTRO ENDERECOS
    addressNumber: string,    
    typeResid: string,
    addressComplement: string,
    addresActive: boolean,    
    isTypeHome: boolean,
    isTypeApt: boolean,
    
    // WEBSOCKETS MESSAGE
    IO_CLIENT_NEW_UPDATE: string,
    IO_CLIENT_FIND: string,
    IO_CLIENT_LIST: string,
    
    // VALIDATE FIELDS
    validName: boolean | null,
    validEmail: boolean | null,
    validCell: boolean | null,
    validCpf: boolean | null,
    validRg: boolean | null,
    sendOrder: any [],

    // CONTROLL
    expedientValues: any[],
    activeIndexCompany: number,    
    list: any[],
    title: any,
    subTitle: any,
    loading: boolean,
    activeComponent: React.ComponentType<any> | null,
    idSubMenu: any[],
    activeIdSubMenu: number,    
    isOpenClientRegistration: boolean,    
    
    // FUNCTIONS
    fnOnChange: (field: string, value:any) => void,
    fnReset: () => void,
}

const stateDefault = {
    
    dataRegister: [{
        _id: null,        
        CLIENTE_ID: 0,
        CLIENTE_NOME: '',
        CLIENTE_EMAIL: '',
        CLIENTE_CELULAR: '',
        CLIENTE_EMAIL_CODE: '',
        CLIENTE_DATA_REGISTRO: '',
        CLIENTE_DATA_ATUALIZACAO: '',
        CLIENTE_AVATAR: '',
        CLIENTE_CPF: '',
        CLIENTE_RG: '',
        CLIENTE_RG_LOCAL: '',
        
        // REDES SOCIAIS
        CLIENTE_YOUTUBE: '',
        CLIENTE_INSTAGRAM: '',
        CLIENTE_FACEBOOK: '',
        CLIENTE_LINKEDIN: '',
        CLIENTE_TWITTER: '',
        CLIENTE_WHATSAPP: '',

        // MEUS ENDEREÇOS
        CLIENTE_ENDERECOS: [],

        // MEUS ENDEREÇOS
        CLIENTE_EMPRESAS: []
    }],

    // CAMPOS AUXILIARES PARA CADASTRO ENDERECOS
    addressNumber: '',
    typeResid: '',
    addressComplement: '',
    addresActive: false,    
    isTypeHome: false, // tipo casa
    isTypeApt: false,  // tipo apt    

    // IO COMMANDS
    IO_CLIENT_NEW_UPDATE: 'IO_CLIENT_NEW_UPDATE',
    IO_CLIENT_FIND: 'IO_CLIENT_FIND',
    IO_CLIENT_LIST: 'IO_CLIENT_LIST',
        
    // VALIDATE FIELDS
    validName: null,
    validEmail: null,
    validCell: null,
    validCpf: null,
    validRg: null,
    sendOrder: [
        {label:'SIM', value:1},
        {label:'NÃO', value:2}
    ],
    // CONTROLL
    expedientValues: [
        {label:'08:00-12:00 às 14:00-18:00', value:1},
        {label:'08:00-18:00', value:2}        
    ],
    activeIndexCompany: -1,
    list: [],
    title: 'MEUS DADOS',
    subTitle: 'Gestão dos meus dados',
    loading: false,
    activeComponent: null,
    idSubMenu: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    activeIdSubMenu: 0,
    isOpenClientRegistration: false
}

let store = ((set : any) => ({
    ...stateDefault,

    fnOnChange: (field:string, value: any) => {
        set((state : any) => {
            return ({...state, [field]: value })
        })
    },

    fnReset: () => {
        set((state : any) => {            
            return ({...stateDefault})
        })
    },

}))

export const clientStore = create(
    persist<IClient>((store), 
        {name:'client-storage', storage: createJSONStorage(() => localStorage)}
    )
)