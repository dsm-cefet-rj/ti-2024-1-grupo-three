import { user } from "../models/User";
const userController = {
  create: async (req, res) => {                   // falta adicionar verificação
    try {
      const userReq = {
        id: req.body.id,
        nome: req.body.nomeUser,
        email: req.body.emailUser,
        senha: req.body.userPass,
      };

      const response = await user.create(userReq);
      res.status(201).json({ response, msg: "Usuário criado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const userRes = await user.find();
      req.json(userRes);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const userRes = await user.findById(id);
      if (!userRes) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }
      res.json(userRes);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const userReq = await user.findById(id);
      if (!userReq) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }

      const deletedUser = await user.findByIdAndDelete(id);

      res.status(200).json({ deletedUser, msg: "Usuário excluido" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const userReq = {
        id: req.body.id,
        nome: req.body.nomeUser,
        email: req.body.emailUser,
        senha: req.body.userPass,
    };
    const updatedUser = await user.findByIdAndUpdate(id, userReq);
    if (!updatedUser) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.status(200).json({ userReq, msg: "Usuário atualizado com sucesso" });
  },
};
export default userController;