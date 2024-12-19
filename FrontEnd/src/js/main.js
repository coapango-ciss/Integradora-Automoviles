import { requestCredentials } from "./services/api.js";
import { decodeJWT } from "./utils/session.js"

let user = {};
let credentials;
let rol;

const login = async () =>{
    user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }
    credentials = await requestCredentials(user);
    if(credentials != null) {
        localStorage.setItem("auth_token",credentials);
        const decoded = await decodeJWT(credentials);
        rol = decoded.rol.toString();
        localStorage.setItem("rol", rol)
    }
    checkSession()
}

const checkSession = async() =>{
    const rol = localStorage.getItem("rol");
    if(rol === "ROLE_ADMIN"){
        window.location.href = "../src/view/cars.html";
        return true
    }else if(rol === "ROLE_EMPLOYEE"){
        window.location.href = "../src/view/selling.html";
        return true;
    }else return false;
}

(async()=>{
    console.log(!localStorage.getItem("auth_token"));
    if(!localStorage.getItem("auth_token")){
        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            login();
        })
    }else{
        checkSession();
    }
})()

