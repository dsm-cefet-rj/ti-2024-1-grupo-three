import mongoose from "mongoose";
import { timeSchema } from "./Time.js";
import { chatSchema } from "./Chat.js";
import { userSchema } from "./User.js";
const { Schema } = mongoose;
const torneioSchema = new Schema(
  {
    nomeTorneio: {
      type: String,
      required: true,
    },
    userIdDonoTorneio: {
      type: userSchema,
      required: true,
    },
    tipoTorneio: {
      type: String,
      required: true,
    },
    qtdTimes: {
      type: Number,
      required: true,
    },
    localTorneio: {
      type: String,
      required: true,
    },
    chat: {
      type:chatSchema,
      required: true,
    },
    Participantes: [
      {
      type: timeSchema, //aqui seria timeschema ou partidaschema
      },
    ],
    //algo relacionado para convidar os times para o torneio
  },
  { timestamps: true }
);

const Torneio = mongoose.model("Torneio", torneioSchema);
export { Torneio, torneioSchema };