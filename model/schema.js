import mongoose, { mongo } from "mongoose";
const schema1=new mongoose.Schema({
    username:{ type: String, unique: true },
    pass:String
})
export const schema=mongoose.model('schema',schema1);