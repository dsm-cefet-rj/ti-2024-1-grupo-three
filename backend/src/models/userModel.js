import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
    {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
}, {timestamps: true});

const userModel = mongoose.model("User", userSchema);

export { userModel, userSchema };