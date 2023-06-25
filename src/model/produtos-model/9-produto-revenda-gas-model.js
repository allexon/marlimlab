import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***        COLEÇÃO REVENDA DE GÁS PRODUTO         ***
***                                               ***
*****************************************************
*/

const schema = new Schema({
    PRODUTO_REVENDA_GAS_ID: {type: Number, requerid: true},
    PRODUTO_REVENDA_GAS_DESCRICAO: {type: String},
    PRODUTO_REVENDA_GAS_VALOR: {type: String},
    PRODUTO_REVENDA_GAS_REVENDA_GAS_IMG: {type: String},
    PRODUTO_REVENDA_GAS_DATA_REGISTRO: {type: Date, default: Date.now},
    PRODUTO_REVENDA_GAS_DATA_ATUALIZACAO: {type: Date, default: Date.now},
    PRODUTO_REVENDA_GAS_TIPO: {type: Schema.Types.Mixed},
    PRODUTO_REVENDA_GAS_EMPRESA: {type: Schema.Types.Mixed}
})

schema.pre('save', function(next) {
    const currentDate = new Date()
    this.PRODUTO_REVENDA_GAS_DATA_REGISTRO = currentDate
    this.PRODUTO_REVENDA_GAS_DATA_ATUALIZACAO = currentDate
    next()
})

export const ProdutoRevendaGasModel = model('PRODUTO_REVENDA_GAS', schema)