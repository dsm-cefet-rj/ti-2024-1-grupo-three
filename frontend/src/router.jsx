import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Partida from "./pages/partida/partida";
import Home from "./pages/home/home";
import Time from "./pages/time/time";
import CriarTime from "./pages/criarTime/criarTime";

const routes = [
  {
    path: "/partida",
    element: <Partida />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/time",
    element: <Time />,
  },
  {
    path: "/criarTime",
    element: <CriarTime />,
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
