import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE CIDADES                ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    CIDADE_ID: {type: String, requerid: true}, //               1    
    CIDADE_CIDADE: {type: String, requerid: true}, //           JOÃO NEIVA
    CIDADE_BANDEIRA: {type: String, requerid: true}, //         img da cidade base64   
    CIDADE_ESTADO_ID: {type: String, requerid: true}, //        1
    CIDADE_ESTADO: {type: String, requerid: true}, //           ESPIRITO SANTO
    CIDADE_ESTADO_SIGLA: {type: String, requerid: true}, //     ES    
    CIDADE_PAIS_ID: {type: String, requerid: true}, //          1
    CIDADE_PAIS: {type: String, requerid: true}, //             BRASIL
    CIDADE_PAIS_SIGLA: {type: String, requerid: true}, //       BR        
})

export const CidadeModel = model('CIDADE', schema)