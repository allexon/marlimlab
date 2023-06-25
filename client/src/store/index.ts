// import Menu do Sistema 
import { menuStore } from './marlimlab/1-menu-store'

// import Components Default 
import { messageStore } from './default/message-store'
import { modalStore } from './default/modal-store'
import { layoutStore } from './default/layout-store'

// import Components App 
import { loginStore } from './marlimlab/login.store'
import { clientStore } from './marlimlab/7-client-store'
import { userStore } from './marlimlab/8-user-store'
import { addressStore } from './marlimlab/6-address-store'
import { companyCategoryStore } from './marlimlab/2-company-category-store'
import { gasStore } from './marlimlab/10-gas-store'
import { mapStore } from './marlimlab/11-map-store'


// Themas Default
import { marlimThemeStore } from './marlimlab/9-marlim-theme-store'


export {
    // Menu do Sistema
    menuStore,

    // Components Default
    messageStore, modalStore, layoutStore, 
    companyCategoryStore, 

    // component App
    loginStore, clientStore, userStore, addressStore, gasStore, mapStore,

    //// Themas Default
    marlimThemeStore
}