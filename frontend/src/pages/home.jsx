import React from "react";

import NavBarTest from "../components/navBarTest";
import ChatBox from "./Chat/chat-box";
import Login from "./Login/login";

const Home = () => {
    const nomeUsu="Cano";
    return(
        <div className="">
            <NavBarTest/>
            <Login/>
        </div>
    );
};

export default Home;