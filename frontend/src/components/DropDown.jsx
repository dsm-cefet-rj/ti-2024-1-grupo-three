import React from "react";
import DropdownDivider from 'react-bootstrap/DropdownDivider'

const DropDown= () =>{
    return(
        <div className="flex flex-col dropDown">
            <ul className="flex flex-col gap-4">
                <li><img src="../img/person-circle.svg"/>Minha Conta</li>
                <li><img src="../img/gear-fill.svg"/>Configuracao</li>
                <DropdownDivider/>
                <li><img src="../img/box-arrow-right.svg"/>Sair</li>
            </ul>
        </div>
    );
}
export default DropDown;