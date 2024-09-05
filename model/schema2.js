import mongoose, { mongo } from "mongoose";
const schema=new mongoose.Schema({
    username:{ type: String, unique: true },
    score:Number,
    first_2048:{ type: String, default:0},
    memory:{ type: String, default:0},
    quiz:{ type: String, default:0},
    r_p_s:{ type: String, default:0},
    snakegame:{ type: String, default:0},
    tic:{ type: String, default:0},
    word_gessing:{ type: String, default:0},
    typeracer:{ type: String, default:0},
})
export const schema2=mongoose.model('score',schema);
