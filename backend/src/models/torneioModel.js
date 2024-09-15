import mongoose from "mongoose";

const { Schema } = mongoose;
const torneioSchema = new Schema(
  {
    nomeTorneio: {
      type: String,
      required: true,
    },
    userIdDonoTorneio: {
      type: mongoose.Schema.Types.ObjectId,
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
      type:mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Participantes: [
      {
      type: mongoose.Schema.Types.ObjectId, //aqui seria timeschema ou partidaschema
      },
    ],
    //algo relacionado para convidar os times para o torneio
  },
  { timestamps: true }
);

const Torneio = mongoose.model("Torneio", torneioSchema);

export { Torneio, torneioSchema };