import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***           COLEÇÃO MENU DO SISTEMA             ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    MENU_ID: {type: Number, requerid: true},
    MENU_NOME: {type: String},
    MENU_DESCRICAO: {type: String},
    MENU_DATA_REGISTRO: {type: Date, default: Date.now },
    MENU_DATA_ATUALIZACAO: {type: Date, default: Date.now },
    MENU_ROTA: {type: String},
    MENU_ROTA_INDICE: {type: String},    
    TITULO_SIDEBAR_CONTEXT: {type: String},
    MENU_ICONE_DESCRICAO: {type: String},
    MENU_PERFIL: {type: String},
})

export const MenuModel = model('MENU', schema)