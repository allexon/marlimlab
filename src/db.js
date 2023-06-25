import { config } from 'dotenv'
import { mongoose } from 'mongoose'

config()
mongoose.set('strictQuery', false)

export const db = async () => {
  try {    
    await mongoose.connect(process.env.SERVER_MARLIM_LAB_FULL_PATH_DB)
    console.log('db local conectado com sucesso')
    const _db = mongoose.connection.useDb(process.env.SERVER_MARLIM_LAB_DB_NAME)
    return _db
  } catch (error) {
    console.log(error)
  }
}