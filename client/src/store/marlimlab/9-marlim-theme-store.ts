import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IMarlimTheme1 {        
    layoutHeaderBg: string,
    layoutContentBg: string,
    layoutFooterBg: string,
    menuHeaderBg: string,
    menuIconFill: string,
    menuIconWidth: string,
    menuFooterBg: string,
    sidebarBg: string,
    sidebarContextBg: string,
    fontOswald: string,
}

const stateDefault = {    
    layoutHeaderBg: '#005476',
    layoutContentBg: '#E3F1E7',
    layoutFooterBg: '#005476',
    menuHeaderBg: '#014058',
    menuFooterBg: '#014058',
    menuIconFill: '#002f4e',    
    menuIconWidth: '85%',
    sidebarBg: '#FFCC29',
    sidebarContextBg: 'white',
    fontOswald: "'Oswald', sans-serif"    
}

let store = ((set : any) => ({
    ...stateDefault,    
    fnOnChangeMarlimTheme1: (field:string, value: string) => set((state : any)  => ({...state, [field]:value })),
    fnResetMarlimTheme1: () => set({...stateDefault})
}))


export const marlimThemeStore = create(
    persist<IMarlimTheme1>(
        (store), 
        {name:'marlim-theme-storage', storage: createJSONStorage(() => localStorage)}
    )
)