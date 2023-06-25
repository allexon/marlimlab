import { Schema, model } from 'mongoose'

/*
*****************************************************
***                                               ***
***             COLEÇÃO DE CLIENTE                ***
***                                               ***
*****************************************************
*/
// EU CHAMO MEU USUARIO INICIAL DE CLIENTE OU SEJA É CLIENTE DO SISTEMA MARLIM-LAB
const schema = new Schema({
    CLIENTE_ID: {type: Number, requerid: true}, //                  1
    CLIENTE_NOME: {type: String, requerid: true}, //                Alexon da Silva Moreira    
    CLIENTE_EMAIL: {type: String, requerid: true}, //               allexon@gmail.com
    CLIENTE_CELULAR: {type: String}, //                             5527992818211    
    CLIENTE_EMAIL_VERIFICADO: {type: Boolean}, //                   false e True
    CLIENTE_DATA_REGISTRO: {type: Date, default: Date.now }, //     01/10/2023
    CLIENTE_DATA_ATUALIZACAO: {type: Date, default: Date.now }, //  01/11/2023
    CLIENTE_AVATAR: {type: String}, //                              img base 64    
    CLIENTE_CPF: {type: String}, //                                 03158035766
    CLIENTE_RG: {type: String}, //                                  666166171
    CLIENTE_RG_LOCAL: {type: String}, //                            SP

    // REDES SOCIAIS
    CLIENTE_YOUTUBE: {type: String}, //                             https://www.youtube.com/@alexon2010
    CLIENTE_INSTAGRAM: {type: String}, //                           https://www.instagram.com/alexonmoreira/
    CLIENTE_FACEBOOK: {type: String}, //                            https://www.facebook.com/alexon.moreira.37
    CLIENTE_LINKEDIN: {type: String}, //                            https://www.linkedin.com/in/alexon-da-silva-moreira-94625145/
    CLIENTE_TWITTER: {type: String}, //                             alexonmoreira
    CLIENTE_WHATSAPP: {type: String}, //                            5527992818276

    // MEUS ENDEREÇOS PF
    CLIENTE_ENDERECOS: [
        {
            CEP: {type: String},                 // '29160114'
            PAIS: {type: String},                // 'BRASIL'            
            ESTADO: {type: String},              // 'ES'
            MUNICIPIO: {type: String},           // 'SERRA'
            BAIRRO: {type: String},              // 'CARAPINA GRANDE'
            LOGRADOURO: {type: String},          // 'RUA QUINZE,
            ENDERECO_NUMERO: {type: String},      // 81' 
            TIPO_RESIDENCIA: {type: String},     // 'CASA' | 'APT'
            ENDERECO_COMPLEMENTO:  {type: String},        // 'próximo ao Material de Construção dias'
            ENDERECO_ATIVO:  {type: Boolean}     // false
        }
    ],
    
    // EMPRESAS DO USUARIO
    CLIENTE_EMPRESAS: [{
        RAZAO_SOCIAL: {type: String}, //                         Alexon da Silva Moreira
        NOME_FANTASIA: {type: String}, //                        Marlim Lab - design de produto
        CNPJ: {type: String}, //                                 011219250001-26
        INSCRICAO_ESTADUAL: {type: String}, //
        CATEGORY: {type: Schema.Types.Mixed},
        EXPEDIENTE: {type: Schema.Types.Mixed},
        RECEBER_PEDIDO: {type: Schema.Types.Mixed},
        IMG_LOGO: {type: String}, //
        YOUTUBE_EMPRESA: {type: String}, //                     https://www.instagram.com/alexonmoreira/
        INSTAGRAM_EMPRESA: {type: String}, //                   https://www.instagram.com/alexonmoreira/
        FACEBOOK_EMPRESA: {type: String}, //                    https://www.facebook.com/alexon.moreira.37
        LINKEDIN_EMPRESA: {type: String}, //                    https://www.linkedin.com/in/alexon-da-silva-moreira-94625145/
        TWITTER_EMPRESA: {type: String}, //                     https://www.instagram.com/alexonmoreira/            
        TELEFONE_FIXO_EMPRESA: {type: String}, //               https://www.instagram.com/alexonmoreira/
        CELULAR_WHATZAPP_EMPRESA: {type: String}, //            https://www.instagram.com/alexonmoreira/
        EMAIL_EMPRESA: {type: String},
        ENDERECOS_EMPRESA: [{
            CEP: {type: String},                 // '29160114'            
            PAIS: {type: String},                // 'BRASIL'            
            ESTADO: {type: String},              // 'ES'
            MUNICIPIO: {type: String},           // 'SERRA'
            BAIRRO: {type: String},              // 'CARAPINA GRANDE'
            LOGRADOURO: {type: String},          // 'RUA QUINZE,
            ENDERECO_NUMERO: {type: String},      // 81' 
            TIPO_RESIDENCIA: {type: String},     // 'CASA' | 'APT'
            ENDERECO_COMPLEMENTO:  {type: String},        // 'próximo ao Material de Construção dias'
            ENDERECO_ATIVO:  {type: Boolean}     // false
        }] // END CLIENTE
    }] // END CLIENTE_EMPRESAS
})

    schema.pre('save', function(next) {
        const currentDate = new Date();        
        this.CLIENTE_DATA_REGISTRO = currentDate;
        this.CLIENTE_DATA_ATUALIZACAO = currentDate;
        next();
    });

export const ClienteModel = model('CLIENTE', schema)