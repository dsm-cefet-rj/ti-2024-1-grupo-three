import mongoose from "mongoose";
import { timeSchema } from "./Time.js";
const { Schema } = mongoose;
const torneioSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nomeTorneio: {
      type: String,
      required: true,
    },
    userIdDonoTorneio: {
      type: String,
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
