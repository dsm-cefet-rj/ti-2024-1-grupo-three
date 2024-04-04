import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const routes = [
  {
    path: "",
    element: "",
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