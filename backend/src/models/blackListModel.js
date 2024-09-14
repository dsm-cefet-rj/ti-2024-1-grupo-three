import mongoose, { mongo } from "mongoose";

const blackListSchema = new mongoose.Schema({
    token:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '15m'
    }
});
const blackListModel  = mongoose.model("Blacklist", blackListSchema);

export { blackListModel, blackListSchema };