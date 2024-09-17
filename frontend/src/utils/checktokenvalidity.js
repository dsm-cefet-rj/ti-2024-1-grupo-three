import {jwtDecode} from "jwt-decode"; // Biblioteca para decodificar JWT sem verificar a assinatura

export const checkTokenValidity = (token) => {
    if (!token) {
        return false;
    }
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};