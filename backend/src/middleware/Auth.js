import jwt from "jsonwebtoken";
function checkToken(req, res, next) {
  const token = req.headers["authorization"].replace("Bearer ", "");
  // const token = authHeader && authHeader.split(" ")[1];
  console.log("token:", token);

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    // req.user = user; //bugado, faz todos o getuser parar de funcionar
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
  }
}
// function checkToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   //const token1 = useSelector((state) => state.auth.token);
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ msg: "Acesso negado!" });
//   }

//   try {
//     const secret = process.env.SECRET;

//     jwt.verify(token, secret);
//     // req.user = user;
//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "token invalido!" });
//   }
// }
export { checkToken };
