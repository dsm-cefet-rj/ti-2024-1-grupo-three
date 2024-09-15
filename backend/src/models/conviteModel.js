import mongoose from "mongoose";

const {Schema} = mongoose;
const conviteSchema = new Schema ({
    usuarioRemetente: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Pode não ser necessário para convites de time para torneio
      },
      usuarioDestinatario: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Pode não ser necessário para convites de time para torneio
      },
      timeDestinatario: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Será necessário apenas para convites de time para torneio
      },
      timeRemetente : {
        type: mongoose.Schema.Types.ObjectId,
        required: false
      },
      torneio : {
        type: mongoose.Schema.Types.ObjectId,
        requires: false
      },
      tipoConvite: {
        type: String,
        enum: ["usuario_para_usuario", "torneio_para_time"], // Define os dois tipos possíveis
        required: true,
      }

},
{timestamps: true}
)
const Convite = mongoose.model("Convite", conviteSchema);

export {Convite, conviteSchema};