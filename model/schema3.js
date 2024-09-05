import mongoose, { mongo } from "mongoose";
const schema1=new mongoose.Schema({
    passage:String
})
export const schema3=mongoose.model('passage1',schema1);