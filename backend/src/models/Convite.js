import mongoose from "mongoose";
import { timeSchema } from "./Time.js";
import { userSchema } from "./User.js";
const {Schema} = mongoose;
const conviteSchema = new Schema ({
    usuarioRemetente:{
        type:userSchema,
        required: true
    },
    usuarioDestinatario:{
        type:userSchema,
        required: true
    },
    timeRemetente:{
        type:timeSchema,
        required: true
    }

},
{timestamps: true}
)
const Convite = mongoose.model("Convite", conviteSchema);
export {Convite, conviteSchema};