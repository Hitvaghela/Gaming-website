import mongoose from 'mongoose'

const schema1=new mongoose.Schema({
    text:{type :String}
})

export const schema=mongoose.model('schema',schema1)