import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    uprice: { type: Number, require: true },
    user: { type: String, require: true }
});

export default model("Product", productSchema);