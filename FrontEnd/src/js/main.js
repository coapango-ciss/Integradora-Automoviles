import { login } from "./utils/session.js";

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }
    login(user);
});
    


