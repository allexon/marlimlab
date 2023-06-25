import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE PAIS                   ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    PAIS_ID: {type: String, requerid: true}, //       1
    PAIS_PAIS: {type: String, requerid: true}, //     BRASIL
    PAIS_SIGLA: {type: String, requerid: true}, //    BR
    PAIS_BANDEIRA: {type: String} //                  img base 64
})

export const PaisModel = model('PAIS', schema)