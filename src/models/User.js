import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: { type: String, require: true, min: 4 },
    email: { type: String, unique: true, require: true, lowercase: true },
    password: { type: String, require: true }
});

//  encriptar la contraseña 
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // comparacion en la propiedad contraseña 
}

export default model("User", userSchema) 