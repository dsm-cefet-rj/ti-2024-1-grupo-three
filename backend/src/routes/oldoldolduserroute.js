// import express from "express";
// import User from "../models/user.js";
// const userRoutes = express.Router();

// //create
// userRoutes.post("/", async (req, res) => {
//   const { id, email, user, senha } = req.body;
//   if (!name) {
//     res.status(422).json({ error: "o nome é obrigatório" });
//     return;
//   }
//   const usuario = {
//     id,
//     email,
//     user,
//     senha,
//   };

//   try {
//     await User.create(usuario);
//     res.status(201).json({ message: "User  inserida no sistema com sucesso" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// //read
// userRoutes.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// userRoutes.get("/:id", async (req, res) => {
//   //extrair dado da requisição
//   const id = req.params.id;
//   try {
//     const user = await User.findOne({ _id: id });
//     if (!user) {
//       res.status(422).json({ message: "usuario nao ecnotnradao" });
//       return;
//     }

//     req.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// //Update
// userRoutes.patch("/:id", async (req, res) => {
//   const idd = req.params.id;
//   const { id, email, user, senha } = req.body;
//   const usuario = {
//     id,
//     email,
//     user,
//     senha,
//   };
//   try {
//     const updatedUser = await User.updateOne({ _id: idd }, usuario);
//     if (updatedUser.matchedCount === 0) {
//       res.status(422).json({ message: "usuario nao ecnotnradao" });
//       return;
//     }

//     res.status(200).json(usuario);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// //delete
// userRoutes.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   const user = await User.findOne({ _id: id });
//   if (!user) {
//     res.status(422).json({ message: "usuario nao ecnotnradao" });
//     return;
//   }
//   try {
//     await User.deleteOne({ _id: id });
//     res.status(200).json({ message: "Usuario removido com sucesso" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// export default userRoutes;
