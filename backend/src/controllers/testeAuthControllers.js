// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";

// const secret = process.env.SECRET;
// const login = (req, res) => {
//   try {
//     User.findOne({ email: req.body.email }, (error, usuario) => {
//       if (!usuario) {
//         console.log(err);
//         return res.status(401).json({
//           msg: "Usuario nao encontrado!",
//           data: {
//             email: req.body.email,
//           },
//         });
//       }
//       const checksenha = bcrypt.compareSync(req.body.senha, usuario.senha);
//       if (!checksenha) {
//         console.log(err);
//         return res.status(401).json({
//           msg: "Não autorizado!",
//         });
//       }

//       const token = jwt.sign(
//         {
//           id: usuario._id,
//         },
//         secret
//       );
//       res.status(200).json({
//         msg: "Login autorizado",
//         data: {
//           token,
//         },
//       });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
//     });
//   }
// };
// function checkToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split("")[1];

//   if (!token) {
//     return res.status(401).json({ msg: "Acesso negado!" });
//   }

//   try {
//     jwt.verify(token, secret);
//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "token invalido!" });
//   }
// }

// export default { login, checkToken };
