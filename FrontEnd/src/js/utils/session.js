import { loadNavbar } from "./nav.js";
import {requestCredentials} from "../services/api.js"

export async function login (user){
    let rol;
    const credentials = await requestCredentials(user); 
    if(credentials != null) {
        const decoded = await decodeJWT();
        rol = decoded.rol.toString();
        localStorage.setItem("rol",rol);
    }
    if(rol === "ROLE_ADMIN"){
        window.location.href = "./view/cars.html";
    }else{
        window.location.href = "./view/selling";
    }
}

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
    const rol = localStorage.getItem("rol");
    if(requestedRoles.includes(rol)){
        await loadNavbar(rol);
    }else{
        alert("acceso denegado");
        await logout();
        window.location.href = "../index.html";
    }
}