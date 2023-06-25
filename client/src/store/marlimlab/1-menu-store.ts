import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IMenu {    
    IO_MENU_LIST: string,
    IO_MENU_NEW: string,
    IO_MENU_UPDATE: string,
    data: string[],
    TITULO_SIDEBAR_CONTEXT: string,    
    fnOnChangeMenu: (field: string, value:any) => void,
    fnResetMenu: () => void,
}

const stateDefault = {    
    IO_MENU_LIST: 'IO_MENU_LIST',
    IO_MENU_NEW: 'IO_MENU_NEW',
    IO_MENU_UPDATE: 'IO_MENU_UPDATE',
    data: [],
    TITULO_SIDEBAR_CONTEXT: ''
}

let store = ((set : any) => ({    
    ...stateDefault,
    fnOnChangeMenu: (field:string, value:any) => set((state : any)  => ({...state, [field]:value })),
    fnResetMenu: () => set({...stateDefault})
}))

export const menuStore = create(
    persist<IMenu>(
        (store), 
        {name:'menu-storage', storage: createJSONStorage(() => localStorage)}
    )
)