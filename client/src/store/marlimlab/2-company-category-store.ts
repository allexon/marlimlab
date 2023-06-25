import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ICompanyCategory {
    data: any[]
    fnOnChangeCompanyCategory: (field: string, value:any) => void,
    fnResetCompanyCategory: () => void,
}

const stateDefault = {    
    data: [
        {label:'Revenda de Gás', value:1},
        {label:'Hot-Dog', value:2}
    ]    
}

let store = ((set : any) => ({    
    ...stateDefault,
    fnOnChangeCompanyCategory: (field:string, value:any) => set((state : any)  => ({...state, [field]:value })),
    fnResetCompanyCategory: () => set({...stateDefault})
}))

export const companyCategoryStore = create(
    persist<ICompanyCategory>(
        (store), 
        {name:'company-category-storage', storage: createJSONStorage(() => localStorage)}
    )
)