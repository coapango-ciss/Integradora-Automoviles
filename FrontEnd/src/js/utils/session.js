import { loadNavbar } from "./nav.js";

export function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("rol");
    window.location.href = "../index.html";
}

export async function checkAuth(requestedRoles) {
    const rol = localStorage.getItem("rol");
    if(requestedRoles.includes(rol)){
        await loadNavbar(rol);
    }else{
        alert("acceso denegado");
        logout();
        window.location.href = "../index.html";
    }
}

export function decodeJWT(credentials) {
    const payloadBase64 = credentials.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
}