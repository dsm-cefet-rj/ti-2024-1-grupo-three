import mongoose from "mongoose";
const { Schema } = mongoose;
const timeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nomeTime: {
      type: String,
      required: true,
    },
    userIdDono: {
      type: String,
      required: true,
    },
    userId: [
      {
        type: String,
      },
    ],
    //algo relacionado a convites para entrar em torneio?
  },
  { timestamps: true }
);

const Time = mongoose.model("Time", timeSchema);

export { Time, timeSchema };
