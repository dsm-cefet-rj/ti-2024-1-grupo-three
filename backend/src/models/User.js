import mongoose from "mongoose";
import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
    {
    id: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
}, {timestamps: true});

const user = mongoose.model("User", userSchema);

export { user, userSchema };