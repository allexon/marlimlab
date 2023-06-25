import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE ENDERECO               ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    ENDERECO_ID: {type: Number, requerid: true}, //                 1
    ENDERECO_CEP: {type: String, requerid: true}, //                29160114
    ENDERECO_PAIS: {type: String, requerid: true}, //               BRASIL
    ENDERECO_PAIS_ID: {type: String, requerid: true}, //            1
    ENDERECO_PAIS_SIGLA: {type: String, requerid: true}, //         BR 
    ENDERECO_IBGE_ID: {type: String }, //                           3205002
    ENDERECO_IBGE_SIAFI: {type: String }, //                        5699
    ENDERECO_IBGE_DDD: {type: String }, //                          27
    ENDERECO_ESTADO: {type: String, requerid: true}, //             ESPIRITO SANTO
    ENDERECO_ESTADO_ID: {type: String, requerid: true}, //          1
    ENDERECO_ESTADO_SIGLA: {type: String, requerid: true}, //       ES
    ENDERECO_CIDADE: {type: String, requerid: true}, //             SERRA
    ENDERECO_CIDADE_ID: {type: String, requerid: true}, //          1 
    ENDERECO_BAIRRO: {type: String, requerid: true}, //             CARAPINA GRANDE
    ENDERECO_BAIRRO_ID: {type: String, requerid: true}, //          18
    ENDERECO_LOGRADOURO_TYPE: {type: String, requerid: true}, //    RUA
    ENDERECO_LOGRADOURO: {type: String, requerid: true}, //         RUA QUINZE
    ENDERECO_LAT: {type: String}, //                                -20.22466892513809
    ENDERECO_LON: {type: String, requerid: true}, //                -40.27772715289032
    ENDERECO_ENDERECO_COMPLETO: [] //                               [RUA, QUINZE, CARAPINA GRANDE, SERRA, ES, BRASIL, 29160114]
})

export const EnderecoModel = model('ENDERECO', schema)