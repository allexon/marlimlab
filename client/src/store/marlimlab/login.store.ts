import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ILogin {    
    email: string,
    password: string,
    userLogged: any[],
    isLogged: boolean
    isValidEmail: boolean,
    isNumberAccess: string | null,
    fnOnChangeLogin: (field: string, value:any) => void,
    fnResetLogin: () => void,
}

const stateDefault = {
    email: '',
    password: '',
    userLogged:[],
    isLogged: false,
    isValidEmail: false,
    isNumberAccess: null
}

let store = ((set : any) => ({
    ...stateDefault,
    fnOnChangeLogin: (field:string, value:string) => set((state : any)  => ({...state, [field]:value })),
    fnResetLogin: () => set({...stateDefault})
}))

export const loginStore = create(
    persist<ILogin>(
        (store), 
        {name:'login-storage', storage: createJSONStorage(() => localStorage)}
    )
)