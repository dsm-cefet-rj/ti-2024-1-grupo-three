import Convite from '../models/Convite.js';
const conviteController = {
    create : async(req, res) => {
        try{
            const convite = {
                usuarioRemetente:req.body.usuarioRemetente,
                usuarioDestinatario:req.body.usuarioDestinatario,
                timeRemetente:req.body.timeRemetente
            };
            const response = await Convite.create(convite);
            res.status(201).json({ response, msg: "Convite criado com sucesso"})
        }catch(error){
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
          const convite = await Convite.find();
          req.json(convite);
        } catch (error) {
          console.log(error);
        }
      },
      get: async (req, res) => {
        try {
          const id = req.params.id;
          const convite = await Convite.findById(id);
          if (!convite) {
            res.status(404).json({ msg: "erro, não encontrado" });
            return;
          }
          res.json(convite);
        } catch (error) {
          console.log(error);
        }
      },
      delete: async (req, res) => {
        try {
          const id = req.params.id;
          const convite = await Convite.findById(id);
          if (!convite) {
            res.status(404).json({ msg: "erro, não encontrado" });
            return;
          }
    
          const deletedconvite = await Convite.findByIdAndDelete(id);
    
          res.status(200).json({ deletedconvite, msg: "convite excluido" });
        } catch (error) {
          console.log(error);
        }
      },
      update: async (req, res) => {
        const id = req.params.id;
        const convite = {
          id: req.body.id,
          idTimes: req.body.idtimes,
        };
        const updatedconvite = await Convite.findByIdAndUpdate(id, convite);
        if (!updatedconvite) {
          res.status(404).json({ msg: "erro, não encontrado" });
          return;
        }
        res.status(200).json({ convite, msg: "serviço atualizado com sucesso" });
      },
    
}
export default conviteController;