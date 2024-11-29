let token = localStorage.getItem("auth_token");

(() => {
    if(token==null) window.location.href = "../view/login.html";
})();


function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "../view/login.html";
}