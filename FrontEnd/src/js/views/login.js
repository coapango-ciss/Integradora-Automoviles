import { requestCredentials } from "../services/api.js";

let user = {};
let credentials;

const login = async () =>{
    user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }
    credentials = await requestCredentials(user);
    if(credentials != null) {
        localStorage.setItem("auth_token",credentials);
        window.location.href = "../view/cars.html";
    }
}

(async()=>{
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        login();
    })
})()

