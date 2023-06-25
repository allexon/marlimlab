import { config } from 'dotenv'
import { mongoose } from 'mongoose'
config()

import express from 'express'

const productRoutes = express.Router()

// uri -> product/types
productRoutes.get('/types', async (req, res) => {
    let _data = []
    try {        
        await mongoose.connect(process.env.SERVER_MARLIM_LAB_FULL_PATH_DB)
        const _db = await mongoose.connection.useDb(process.env.SERVER_MARLIM_LAB_DB_NAME)
        const _collection = await _db.collection('produto_tipos').find().toArray()
        _data = _collection
    } catch (error) {
        console.log('::: ERROR', error)    
    }
    res.send(_data)
})

export default productRoutes
