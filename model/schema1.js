import mongoose, { mongo } from "mongoose";
const schema1=new mongoose.Schema({
    username:{type:String},
    pass:String
})
export const schema=mongoose.model('new_schema',schema1);