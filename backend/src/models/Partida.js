import mongoose from "mongoose";
import { timeSchema } from "./Time.js";
const { Schema } = mongoose;
const partidaSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    idTimes: {
      type: [timeSchema],
    },
    //para nome da partida, acho que dá pra acessar o time pelo id e buscar o nomeTime
  },
  { timestamps: true }
);

const Partida = mongoose.model("Partida", partidaSchema);
export { Partida, partidaSchema };
