import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IMessage {    
    visible: boolean,
    message: any,
    className: string,
    isLoading: boolean,    
    animationClassCss: string,
    fnSuccess: (value : any) => void,
    fnError: (value : any) => void,
    fnInfo: (value : any) => void,
    fnOnChangeMessage: (field: string, value:any) => void,
    fnResetMessage: () => void,
}

const stateDefault = {
    visible: false,
    message: null,
    className: '',
    isLoading: false,    
    animationClassCss: '',
}

let store = ((set : any) => ({
    ...stateDefault,
    fnOnChangeMessage: (field:string, value:string) => set((state : any)  => ({...state, [field]:value })),
    fnSuccess: () => set(),
    fnError: () => set(),
    fnInfo: () => set(),
    fnResetMessage: () => set({...stateDefault})
}))

export const messageStore = create(
    persist<IMessage>(
        (store), 
        {name:'message-storage', storage: createJSONStorage(() => localStorage)}
    )
)