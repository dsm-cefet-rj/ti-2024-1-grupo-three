import mongoose from "mongoose";
import { userSchema } from "./userModel.js";
const { Schema } = mongoose;
const timeSchema = new Schema(
  {
    nomeTime: {
      type: String,
      required: true,
    },
    userIdDono: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia o modelo User
      required: true,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia o modelo User
      },
    ],
    //algo relacionado a convites para entrar em torneio?
    //e para convidar jogador
  },
  { timestamps: true }
);

const timeModel = mongoose.model("Time", timeSchema);

export { timeModel, timeSchema };
