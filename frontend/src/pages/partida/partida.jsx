import { React, useState } from "react";
import Jogador from "../../components/jogador/jogador";
import Button from "../../components/button/button";
import "../partida/partida.css";
import NavBar from "../../components/navBar/navBar";
// import conn from "../../../../backend/src/db/conn";
// import { partidaSchema } from "../../../../backend/src/models/Partida";
// import { torneioSchema } from "../../../../backend/src/models/Torneio";

// // Criando os modelos
// const Torneio = mongoose.model("Torneio", torneioSchema);
// const Partida = mongoose.model("Partida", partidaSchema);

// async function alocarPartidas() {
//   try {
//     // Obtém o torneio (substitua por um filtro caso tenha mais de um torneio)
//     const torneio = await Torneio.findOne({
//       /* filtro se necessário */
//     });

//     if (
//       !torneio ||
//       !torneio.participantes ||
//       torneio.participantes.length < 2
//     ) {
//       console.log("Participantes insuficientes ou torneio não encontrado.");
//       return;
//     }

//     const participantes = torneio.participantes;

//     // Itera pelos participantes em pares e cria as partidas
//     for (let i = 0; i < participantes.length; i += 2) {
//       if (i + 1 < participantes.length) {
//         // Certifica-se de que há um par
//         const timeMandante = participantes[i];
//         const timeVisitante = participantes[i + 1];

//         // Cria a partida
//         const partida = new Partida({
//           timeMandante: timeMandante,
//           timeVisitante: timeVisitante,
//         });

//         // Insere a partida na coleção de partidas
//         await partida.save();
//         console.log(
//           `Partida entre ${timeMandante} e ${timeVisitante} criada com sucesso!`
//         );
//       }
//     }

//     console.log("Todas as partidas foram alocadas com sucesso!");
//   } catch (err) {
//     console.error("Erro ao alocar partidas:", err);
//   }
// }

// // Conectando ao banco e chamando a função
// conn().then(() => alocarPartidas());
const Partidas = ({ id }) => {
  const jogadores = [
    { id: "1", nome: "Cristiano Gornaldo" },
    { id: "2", nome: "Sósia do Neymar" },
    { id: "3", nome: "Cano Sacudo" },
  ];

  const jogadoresNota = [
    { id: "1", nome: "Cristiano Gornaldo", nota: "5.4", votos: "10" },
    { id: "2", nome: "Sósia do Neymar", nota: "7.4", votos: "12" },
    { id: "3", nome: "Cano Sacudo", nota: "10", votos: "2" },
  ];

  const time1 = "jogadores do vasco";
  const time2 = "jogadores do fluminense";
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div>
      <NavBar />
      <div>
        <h1>{time1}</h1>
        {show ? (
          <div>
            <div>
              {jogadores.map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>

            <div>
              <Button show={show} setShow={setShow} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              {jogadores.slice(0, 2).map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>

            <div>
              <Button show={show} setShow={setShow} />
            </div>
          </div>
        )}
      </div>
      <div>
        <h1>{time2}</h1>
        {show2 ? (
          <div>
            <div>
              {jogadores.map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>
            <div>
              <Button show={show2} setShow={setShow2} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              {jogadores.slice(0, 2).map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>
            <div>
              <Button show={show2} setShow={setShow2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Partidas;
