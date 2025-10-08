const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
    container.classList.remove("toggle");
})
btnSignUp.addEventListener("click",()=>{
    container.classList.add("toggle");
})
const signInForm = document.querySelector(".sign-in");
const signUpForm = document.querySelector(".sign-up");


const signInEmail = document.querySelector(".sign-in input[type='text']");
const signInPassword = document.querySelector(".sign-in input[type='password']");
const signUpName = document.querySelector(".sign-up input[placeholder='Nombre']");
const signUpEmail = document.querySelector(".sign-up input[placeholder='Correo']");
const signUpPassword = document.querySelector(".sign-up input[type='password']");


function guardarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const existe = usuarios.some(u => u.email === usuario.email);
    
    if (!existe) {
        usuarios.push(usuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return true;
    }
    return false;
}

function verificarCredenciales(email, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(user => user.email === email && user.password === password);
}

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nuevoUsuario = {
        nombre: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    };
    
    if (guardarUsuario(nuevoUsuario)) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        container.classList.remove("toggle");
        signUpForm.reset();
    } else {
        alert("Este correo electrónico ya está registrado.");
    }
});

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const usuario = verificarCredenciales(signInEmail.value, signInPassword.value);
    
    if (usuario) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        
        window.location.href = "home.html";
    } else {
        alert("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
});

btnSignIn.addEventListener("click",()=>{
    container.classList.remove("toggle");
})

btnSignUp.addEventListener("click",()=>{
    container.classList.add("toggle");
})
function navegarA(pagina) {
    window.location.href = pagina;
}

const btnRegistrarse = document.getElementById("btn-registrarse");
const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");


if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener("click", () => {
        navegarA('inicio.html');
    });
}
