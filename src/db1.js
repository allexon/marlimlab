/* 
  NÃO ESTOU UTILIZANDO MONGO-CLIENT 
  APENAS COMO EXEMPLO QUANDO EU QUISER UTILIZAR O MESMO
  SEM NENHUM DEPEDÊNCIA DE TERCEIRO, OU SEJA UTILIZAR MONGO
  DE FORMA NATIVA
  */

import { MongoClient } from 'mongodb'

// URL de conexão com o banco de dados
const url = 'mongodb://localhost:27017/marlimlab'

// Opções de conexão
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const db = async () => {
  try {
    const client = await MongoClient.connect(url, options);
    console.log('Conectado com sucesso ao banco de dados');
    return client.db();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}