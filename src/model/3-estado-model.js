import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE ESTADO                 ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    ESTADO_ID: {type: String, requerid: true}, //           1
    ESTADO_ESTADO: {type: String, requerid: true}, //       ESPIRITO SANTO
    ESTADO_SIGLA: {type: String, requerid: true}, //        ES
    ESTADO_BANDEIRA: {type: String}, //                     img do estado base64
    ESTADO_PAIS_ID: {type: String, requerid: true}, //      1
    ESTADO_PAIS: {type: String, requerid: true}, //         BRASIL
    ESTADO_PAIS_SIGLA: {type: String, requerid: true}, //   BR
})

export const EstadoModel = model('ESTADO', schema)