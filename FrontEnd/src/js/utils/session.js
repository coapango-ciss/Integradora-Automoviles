import { loadNavbar } from "./nav.js";

export function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "../index.html";
}

function decodeJWT() {
    const token = localStorage.getItem("auth_token");
    if(!token){
        window.location.href = "/FrontEnd/src/index.html";
        return;
    }
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
}

export async function checkAuth(requestedRoles) {
    const decoded = await decodeJWT();
    const rol = decoded.rol.toString();
    if(requestedRoles.includes(rol)){
        await loadNavbar(rol);
    }else{
        alert("acceso denegado");
        window.location.href = "../view/cars.html";
    }
}