import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Partida from "./pages/partida/partida";
import Home from "./pages/home/home";
import ChatBox from "./pages/Chat/chat-box";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro"

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
    path: "/chat",
    element: <ChatBox/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
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
