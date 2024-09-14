import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CriarTime from "./pages/criarTime/criarTime";
import Time from "./pages/time/time";
import TorneioCriado from "./pages/TorneioCriado/torneiocriado";
import Partida from "./pages/partida/partida";
import MeusTorneios from "./pages/meusTorneios/meusTorneios";
import CriarTorneio from "./pages/CriarTorneio/criarTorneio";
import ChatBox from "./pages/Chat/chat-box";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro";
import Convite from "./components/convite/convite";
import MostrarTorneio from "./pages/MostrarTorneio/MostrarTorneio";
import Usuario from "./pages/Usuario/Usuario";

/**
 * Definição das rotas da aplicação.
 *
 * Cada objeto dentro do array `routes` define uma rota com o caminho (`path`) e o componente correspondente (`element`).
 *
 * @constant
 * @type {Array.<{path: string, element: JSX.Element}>}
 */
const routes = [
  {
    path: "/partida",
    element: <Partida />,
  },
  {
    path: "/convite",
    element: <Convite />,
  },
  {
    path: "/meustorneios",
    element: <MeusTorneios />,
  },
  {
    path: "/criartorneio",
    element: <CriarTorneio />,
  },
  {
    path: "/torneiocriado",
    element: <TorneioCriado />,
  },
  {
    path: "/time",
    element: <Time />,
  },
  {
    path: "/criarTime",
    element: <CriarTime />,
  },
  {
    path: "/chat",
    element: <ChatBox />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Cadastro />,
  },
  {
    path: "/mostrartorneio/:id",
    element: <MostrarTorneio />,
  },
  {
    path: "/usuario",
    element: <Usuario />,
  },
];

/**
 * Componente Router.
 *
 * Este componente utiliza o `BrowserRouter` e o `Routes` do `react-router-dom` para definir e gerenciar as rotas da aplicação.
 * As rotas são mapeadas a partir de um array de objetos `routes`, onde cada rota é definida por um caminho (`path`) e um elemento de componente (`element`).
 *
 * @component
 * @param {Object} props - Propriedades do componente.
 * @returns {JSX.Element} O componente Router que renderiza as rotas configuradas.
 */
function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
