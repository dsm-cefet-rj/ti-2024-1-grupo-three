import mongoose from "mongoose";
async function conn() {
  try {
    await mongoose.connect(
      "mongodb+srv://calmon:calmon@futebrol.9krww.mongodb.net/?retryWrites=true&w=majority&appName=FuteBRol"
    );
    console.log("Conectado ao banco");
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

export default conn;
