const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
//rota inicial
app.get("/", (req, res) => {
  //mostrar req
  res.json({ message: "oi express" });

  //parei na junção com atlas
});
//entregar uma porta
app.listen(3000);
