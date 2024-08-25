import mongoose from "mongoose";
import { userSchema } from "./User.js";
const { Schema } = mongoose;
const timeSchema = new Schema(
  {
    nomeTime: {
      type: String,
      required: true,
    },
    userIdDono: {
      type: userSchema,
      required: true,
    },
    userId: [
      {
        type: userSchema,
      },
    ],
    //algo relacionado a convites para entrar em torneio?
    //e para convidar jogador
  },
  { timestamps: true }
);

const Time = mongoose.model("Time", timeSchema);

export { Time, timeSchema };
