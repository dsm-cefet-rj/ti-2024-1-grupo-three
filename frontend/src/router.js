import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBox from "./pages/Chat/chat-box";
import Home from "./pages/home";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro";

const routes = [
  {
    path: "/chat",
    element: <ChatBox/>,
  },{
    path:"/",
    element:<Home/>,
  },{
    path:"/login",
    element:<Login/>,
  },{
    path:"/cadastro",
    element:<Cadastro/>
  }
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