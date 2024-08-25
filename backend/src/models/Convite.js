import mongoose from "mongoose";
import { timeSchema } from "./Time.js";
import { userSchema } from "./User.js";
import {torneioSchema} from "./Torneio.js"
const {Schema} = mongoose;
const conviteSchema = new Schema ({
    usuarioRemetente: {
        type: userSchema,
        required: false, // Pode não ser necessário para convites de time para torneio
      },
      usuarioDestinatario: {
        type: userSchema,
        required: false, // Pode não ser necessário para convites de time para torneio
      },
      timeDestinatario: {
        type: timeSchema,
        required: false, // Será necessário apenas para convites de time para torneio
      },
      timeRemetente : {
        type: timeSchema,
        required: false
      },
      torneio : {
        type: torneioSchema,
        requires: false
      },
      tipoConvite: {
        type: String,
        enum: ["usuario_para_time", "torneio_para_time"], // Define os dois tipos possíveis
        required: true,
      }

},
{timestamps: true}
)
const Convite = mongoose.model("Convite", conviteSchema);
export {Convite, conviteSchema};