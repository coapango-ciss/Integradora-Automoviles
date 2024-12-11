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

export async function checkAuth() {
    const decoded = await decodeJWT();
    const rol = decoded.rol.toString();
    if (rol === "ROLE_ADMIN") {
        console.log("Acceso de administrador");
    } else if (rol === "ROLE_EMPLOYEE") {
        console.log("Acceso de empleado");
    } else {
        alert("Acceso denegado");
    }
}