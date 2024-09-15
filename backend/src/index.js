import express from "express";
import 'dotenv/config';
import cors from "cors";
import routes from "./routes/index.js";
import databaseConnect from "./database/dbConnect.js";

const app = express();
const connection = await databaseConnect();
connection.on("error", (erro) => {
    console.log("erro de conexao:", erro);
})
connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})
app.use(cors());
app.use(express.json());
app.use(routes);
const PORT = 3004;
app.listen(PORT,() => {
    console.log(`escutando na porta ${PORT}`);
})