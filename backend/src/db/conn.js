import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const dbUser = process.env.DB_USER;
async function conn() {
  try {
    await mongoose.connect(`${dbUser}`);
    console.log("Conectado ao banco");
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

export default conn;
