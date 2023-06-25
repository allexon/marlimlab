import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IModal {    
    visible: boolean,        
    animationClassCss: string,
    component: any,
    fnOpen: () => void,
	fnClose: () => void,
    fnOnChangeModal: (field: string, value:any) => void,
    fnResetModal: () => void,
}

const stateDefault = {
    visible: false,
    animationClassCss: '',
    component: null,
}

let store = ((set : any) => ({
    ...stateDefault,
    fnOnChangeModal: (field:string, value:string) => set((state : any)  => ({...state, [field]:value })),
    fnOpen: () => set(),
    fnClose: () => set(),
    fnResetModal: () => set({...stateDefault})
}))

export const modalStore = create(
    persist<IModal>(
        (store), 
        {name:'modal-storage', storage: createJSONStorage(() => localStorage)}
    )
)

