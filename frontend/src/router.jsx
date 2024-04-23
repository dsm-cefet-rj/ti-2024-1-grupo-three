import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CriarTime from "./pages/criarTime/criarTime";
import Time from "./pages/time/time";
import TorneioCriado from "./pages/TorneioCriado/torneiocriado";
import Partida from "./pages/partida/partida";
import MeusTorneios from "./pages/meusTorneios/meusTorneios";
import CriarTorneio from "./pages/CriarTorneio/criarTorneio"
import ChatBox from "./pages/Chat/chat-box";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro"

const routes = [
  {
    path: "/partida",
    element: <Partida />,
  },
  {
    path: "/meustorneios",
    element: <MeusTorneios />,
  },
  {
    path:"/criartorneio",
    element: <CriarTorneio />,
  },
  {
    path:"/torneiocriado",
    element: <TorneioCriado/>,
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
    element: <ChatBox/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Cadastro />,
  },
];

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
