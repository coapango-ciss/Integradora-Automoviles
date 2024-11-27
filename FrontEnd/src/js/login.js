const URL = 'http://localhost:8080';
let user = {};

/*----- Solicitud de Credenciales -----*/

const login = async () =>{
    let form = document.getElementById('loginForm');
    user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }
    await fetch(`${URL}/automoviles/auth`,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        body: JSON.stringify(user) 
    })
    /* ----- Redireccion al panel principal segun rol ----- */
    .then(response => response.json()).then(async response => {
        console.log(response);
        if(response.data != null) {
            localStorage.setItem("auth_token",response.data);
            window.location.href = "/view/cars.html";
        }
        console.log(`auth_token: ${localStorage.getItem("auth_token")}`);
    }).catch(console.log)
}

