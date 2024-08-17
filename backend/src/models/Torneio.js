import mongoose from "mongoose";
import { partidaSchema } from "./Partida.js";
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
    Participantes: {
      type: [partidaSchema], //aqui seria timeschema ou partidaschema
    },
  },
  { timestamps: true }
);

const Torneio = mongoose.model("Torneio", torneioSchema);
export { Torneio, torneioSchema };
