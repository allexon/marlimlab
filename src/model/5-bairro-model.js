import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE BAIRRO                 ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    BAIRRO_ID: {type: String, requerid: true}, //           1
    BAIRRO_BAIRRO: {type: String, requerid: true}, //       CARAPINA GRANDE
    BAIRRO_CIDADE_ID: {type: String, requerid: true}, //    40
    BAIRRO_CIDADE: {type: String, requerid: true}, //       SERRA
    BAIRRO_ESTADO_ID: {type: String, requerid: true}, //    1
    BAIRRO_ESTADO: {type: String, requerid: true}, //       ESPIRITO SANTO    
    BAIRRO_ESTADO_SIGLA: {type: String, requerid: true}, // ES    
    BAIRRO_PAIS_ID: {type: String, requerid: true}, //      1
    BAIRRO_PAIS: {type: String, requerid: true}, //         BRASIL    
    BAIRRO_PAIS_SIGLA: {type: String, requerid: true}, //   BR
})

export const BairroModel = model('BAIRRO', schema)