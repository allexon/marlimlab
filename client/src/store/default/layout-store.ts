import React from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ILayout {    
    
    // Sidebar
    sidebarWidth: string,
    sidebarleftOpen: string,
    sidebarLeftClose: string,

    // Sidebar Context    
    sidebarContextWidth: string,    
    sidebarContextComponent: React.ComponentType<any> | null,
    
    // Item Ativo do Menu
    activeItemMenu: string,    
    activeIconMenu: React.ReactNode,

    // constrol
    isBlock: boolean,
    isOpenSidebar: boolean,
    isOpenSidebarContext: boolean,
    isVisibleSidebarContext: boolean,
    isVisibleForm : boolean

    fnOnChangeLayout: (field: string, value:any) => void,    
    fnResetLayout: () => void,
}

const stateDefault = {

    //Sidebar
    sidebarWidth:'300px',
    sidebarleftOpen: '0px',
    sidebarLeftClose: '-300px',
    
    // SidebarContent
    sidebarContextWidth:'250px',
    sidebarContextComponent: null,
    
    // Item Ativo do Menu    
    activeItemMenu: '',
    activeIconMenu: null,

    // constrol
    isBlock: false,
    isOpenSidebar: true,
    isOpenSidebarContext : false,
    isVisibleSidebarContext: false,
    isVisibleForm : false
}

let store = ((set : any) => ({
    ...stateDefault,    
    fnOnChangeLayout: (field:string, value:string) => set((state : any) => ({...state, [field]:value})),
    fnResetLayout: () => set({...stateDefault})
}))

export const layoutStore = create(
    persist<ILayout>(
        (store), 
        {name:'message-storage', storage: createJSONStorage(() => localStorage)}
    )
)