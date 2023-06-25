import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE USUARIO                ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    USUARIO_ID: {type: String, requerid: true}, // 1
    USUARIO_CLIENTE_ID: [Schema.Types.ObjectId], // Recebe id do Cliente
    USUARIO_PODE_CONFIRMAR_RECEBIMENTO_PEDIDO: {type: Boolean}, // FALSE -> Não pode responder que recebeu pedido | TRUE -> pode responder pedido
    USUARIO_DATA_REGISTRO: {type: Date, default: Date.now }, // 01/10/2023
    USUARIO_DATA_ATUALIZACAO: {type: Date, default: Date.now }, // null
    USUARIO_AVATAR: {type: String}, // img base 64
})

export const UsuarioModel = model('USUARIO', schema)