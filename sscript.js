document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector(".container");
    const btnSignIn = document.getElementById("btn-sign-in");
    const btnSignUp = document.getElementById("btn-sign-up");

    // Lógica de animación: Cambio de vista entre Login y Registro
    btnSignIn.addEventListener("click",()=>{
        container.classList.remove("toggle");
    })
    btnSignUp.addEventListener("click",()=>{
        container.classList.add("toggle");
    })
    
    // Variables de formularios y campos
    const signInForm = document.querySelector(".sign-in");
    const signUpForm = document.querySelector(".sign-up");

    const signInEmail = document.querySelector(".sign-in input[type='text']");
    const signInPassword = document.querySelector(".sign-in input[type='password']");
    const signUpName = document.querySelector(".sign-up input[placeholder='Nombre']");
    const signUpEmail = document.querySelector(".sign-up input[placeholder='Correo']");
    const signUpPassword = document.querySelector(".sign-up input[type='password']");

    // --- Funciones de LocalStorage ---

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

    // --- Lógica de Formulario de REGISTRO (SIGN UP) ---
    
    signUpForm.addEventListener("submit", (e) => {
        // [MARCADO]: Previene la acción por defecto del formulario (que podría causar el 404)
        e.preventDefault(); 
        
        const nuevoUsuario = {
            nombre: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        };
        
        if (guardarUsuario(nuevoUsuario)) {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            
            // [MARCADO]: Vuelve a la vista de Iniciar Sesión para que el usuario inicie
            container.classList.remove("toggle"); 
            
            // [MARCADO]: Limpia los campos del formulario de registro
            signUpForm.reset(); 
            
            // [MARCADO]: ¡Asegúrate de que NO haya una línea 'window.location.href = "..."' aquí!
            // La funcionalidad es que se quede en la página de login/registro.
        } else {
            alert("Este correo electrónico ya está registrado.");
        }
    });

    // --- Lógica de Formulario de INICIAR SESIÓN (SIGN IN) ---

    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const usuario = verificarCredenciales(signInEmail.value, signInPassword.value);
        
        if (usuario) {
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
            
            // [MARCADO]: Redirección a la página principal después del login
            // Asegúrate de que "index.html" sea realmente tu página HOME
            window.location.href = "index.html"; 
        } else {
            alert("Credenciales incorrectas. Verifica tu email y contraseña.");
        }
    });


    // --- Lógica de Botones (Si se usan para Navegar entre páginas) ---
    // NOTA: Estos botones no existen en tu HTML de login/registro, pero los dejaste en el JS
    // Si la idea es usarlos en otra página, esta lógica está bien.
    function navegarA(pagina) {
        window.location.href = pagina;
    }

    const btnRegistrarse = document.getElementById("btn-registrarse");
    const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");

    if (btnRegistrarse) {
        btnRegistrarse.addEventListener("click", () => {
            navegarA('registro.html'); // Si 'registro.html' es una página distinta del login actual
        });
    }
    if (btnIniciarSesion) {
        btnIniciarSesion.addEventListener("click", () => {
            navegarA('inicio.html'); // Si 'inicio.html' es una página distinta del login actual
        });
    }
});