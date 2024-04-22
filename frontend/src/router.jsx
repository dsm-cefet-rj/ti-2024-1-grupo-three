import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CriarTorneio from "./pages/CriarTorneio/criarTorneio";
import TorneioCriado from "./pages/TorneioCriado/torneiocriado";
import MeusTorneios from "./pages/Campeonatos/campeonato";
const routes = [
  {
    path: "/",
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