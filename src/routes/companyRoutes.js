import { config } from 'dotenv'
import { mongoose } from 'mongoose'
config()

import express from 'express'

const companyRoutes = express.Router()

// uri -> company/categories
companyRoutes.get('/categories', async (req, res) => {
    let _data = []
    try {        
        await mongoose.connect(process.env.MARLIM_LAB_FULL_PATH_DB)
        const _db = await mongoose.connection.useDb(process.env.MARLIM_LAB_DB_NAME)
        const _collection = await _db.collection('empresa_categorias').find().toArray()
        _data = _collection
    } catch (error) {
        console.log('::: ERROR', error)    
    }
    res.send(_data)
})

export default companyRoutes