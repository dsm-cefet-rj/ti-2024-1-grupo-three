import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CriarTorneio from "./components/CriarTorneio/criarTorneio";
import TorneioCriado from "./components/TorneioCriado/torneiocriado";
const routes = [
  {
    path: "/",
    element: <Home />,
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