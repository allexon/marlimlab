import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IMap {        
    companies: any[],
    activeCompany: null,

    estados: any[],
    activeEstado: null,

    municipios: any[],
    activeMunicipio: null,

    bairros: any[],
    activeBairro: null,

    selectedMunicipios: any[]
    selectedBairros: any[],

    mapRoutes: any[]

    isVisibleForm: boolean,
    fnOnChangeMap: (field: string, value:any) => void,
    fnResetMap: () => void,
}

const stateDefault = {    
    companies: [],
    activeCompany: null,

    estados: [],
    activeEstado: null,
    
    municipios: [],
    activeMunicipio: null,

    bairros:[],
    activeBairro: null,

    isVisibleForm: false,

    selectedMunicipios: [],
    selectedBairros: [],

    mapRoutes: []

}

let store = ((set : any) => ({
    ...stateDefault,
    fnOnChangeMap: (field:string, value:string) => set((state : any)  => ({...state, [field]:value })),
    fnResetMap: () => set({...stateDefault})
}))

export const mapStore = create(
    persist<IMap>(
        (store), 
        {name:'map-storage', storage: createJSONStorage(() => localStorage)}
    )
)