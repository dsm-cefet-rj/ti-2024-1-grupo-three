import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getAll(req, res) {
  try {
    const { nome_like } = req.query;
    let userRes;
    
    if (nome_like) {
      // Usando $regex para simular o LIKE no MongoDB
      userRes = await User.find({
        nome: { $regex: nome_like, $options: "i" } // 'i' é para case-insensitive
      });
    } else {
      userRes = await User.find(); // O MongoDB usa find() para buscar todos os registros
    }

    res.json(userRes);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
}

async function get(req, res) {
  try {
    const id = req.params.id;
    const userRes = await User.findById(id, "-password");
    if (!userRes) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.json(userRes);
  } catch (error) {
    console.log(error);
  }
}

async function create(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ msg: "Por favor, utilize outro email!" });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);
    const newUser = new User({
      nome,
      email,
      senha: passwordHash,
    });

    const response = await newUser.save();
    res.status(201).json({ response, msg: "Usuário criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

async function update (req, res) {
  const id = req.params.id;
  const userReq = {
    id: req.body.id,
    nome: req.body.nomeUser,
    email: req.body.emailUser,
    senha: req.body.userPass,
  };
  const updatedUser = await User.findByIdAndUpdate(id, userReq);
  if (!updatedUser) {
    res.status(404).json({ msg: "erro, não encontrado" });
    return;
  }
  res.status(200).json({ userReq, msg: "Usuário atualizado com sucesso" });
}

async function deleteUser (req, res) {
  try {
    const id = req.params.id;
    const userReq = await User.findById(id);
    if (!userReq) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    res.status(200).json({ deletedUser, msg: "Usuário excluido" });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res){
  try{
      const email = req.body.email;
      const senha = req.body.senha;

      const existingUserArray = await userModel.find({email});
      const existingUser = existingUserArray[0];

      if(existingUser == undefined){
          return res.status(400).send({
              message: "Login ou Senha errados.",
              status: false
          });
      }
      
      //hash de senha
      const passwordMatch = await bcrypt.compare(senha, existingUser.senha);
      
      if(!passwordMatch){
          throw new Error("Login ou senha errados");
      }else{
          
          const token = jsonwebtoken.sign(
              {
                  id: existingUser._id,
                  type: "user"
              }, 
              process.env.SECRET_JWT, 
              {expiresIn: '15m'}
          );
          const { exp } = jsonwebtoken.decode(token);
          return res.status(200).send({
              message: "Login realizado com sucesso",
              status: true,
              token: token,
              user: existingUser,
              expiration: exp
          });
      }
      
  }catch(error){
      return res.status(400).send({
          message: error.message,
          erro: error
      });
  }
}
async function logout(req, res){
  try{
      const token = req.headers.authorization;

      if(token){
          await blackListModel.create({token});
      }
      

      return res.status(200).send({
          message: "Logout efetuado com sucesso"
      });
  }catch(error){
      return res.status(400).send({
          message: "Ocorreu um erro ao efetuar o logout"
      })
  }
}

export {getAll, get, create, update, deleteUser, login, logout};