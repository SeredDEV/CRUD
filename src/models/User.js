import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name:{ type: String,require: true, min:4},
    email: { type: String,require: true, lowercase:true},
    password: { type: String,require: true}
});

export default model("User",userSchema)