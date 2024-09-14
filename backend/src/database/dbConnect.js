import mongoose from "mongoose";

async function databaseConnect() {
    mongoose.connect(process.env.DB_USER);
    return mongoose.connection;
}

export default databaseConnect;