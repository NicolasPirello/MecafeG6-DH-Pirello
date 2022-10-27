const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      );
  };

const idModals = ['modalLogin'];

function openModal(id){
    let modal = document.getElementById(id);
    modal.style.display = "initial" ; 
    openCloseSideChangeVisibility();
}

function closeModal(id){
    let modal = document.getElementById(id);
    modal.style.display = "none" ;
    openCloseSideChangeVisibility();
}

function openCloseSideChangeVisibility(){
    let openCloseSide = document.getElementById("openCloseSide");    
    let visibility = getComputedStyle(openCloseSide).visibility;
    
    openCloseSide.style.visibility = visibility == "hidden" ? "visible" : "hidden";
}

//valida si se debe abrir login al haber errores de validacion
function validateOpenLoginErrors(){
    let login = document.getElementById('modalLogin');
    
    if(login.getAttribute('active') != null){
        openModal('modalLogin');
    }
}

//obtiene ruta de pagina actual
function getRoute(){
    return window.location.pathname;
}

//inserta en iput oculto de login (para que redireccione correctamente)
function insertRouteInputLogin(){
    let url = getRoute();
    document.getElementById("inputRouteLogin").value = url;
}

let checkModalToClose = () => {
    idModals.forEach(function(idModal){
        let modal = document.getElementById(idModal);

        if (modal.style.display == "initial") {
            closeModal(idModal);  
        }
    });    
}

let validateFormLogin = function validateFormLogin() {
    let errors = false;
    let email = document.getElementById('emailLogin');
    let pass = document.getElementById('passLogin');
    let messageMail = "";
    let divMessageErrorMail = document.querySelector('.form-group-email .modal__formError');
    let divMessageErrorPass = document.querySelectorAll('.form-group-pass .modal__formError');

    divMessageErrorPass.forEach((item)=>{
        item.innerText = "";
    })
    
    if(email.value.trim() == ""){
        messageMail = "Email es requerido";
    }else if(!validateEmail(email.value)){
        messageMail = "Email debe tener el formato correcto";
    }

    if(messageMail != ""){
        divMessageErrorMail.innerText = messageMail;
        divMessageErrorMail.classList.remove('display-none');
        errors = true;
    }else{
        divMessageErrorMail.classList.add('display-none');
    }

    if(pass.value.trim() == ""){
        divMessageErrorPass[0].innerText = "Contraseña es requerida";
        divMessageErrorPass[0].classList.remove('display-none');
        errors = true;
    }else{
        divMessageErrorPass[0].classList.add('display-none');
    }

    return errors;
}

function eventsInputs(){
    let inputs = document.querySelectorAll("#formLogin input");
    let formLogin = document.getElementById('formLogin');

    formLogin.addEventListener('submit',(event) => {
        event.preventDefault();
        if(!validateFormLogin()){
            document.getElementById("formLogin").submit();
        } 
    });

    inputs.forEach(input => {
        input.addEventListener('keyup',validateFormLogin);
        input.addEventListener('blur',validateFormLogin);
    })
}
//ejecutar estas funciones al cargar pagina
window.addEventListener('load', function() {
    validateOpenLoginErrors();
    insertRouteInputLogin();
    eventsInputs();

    /** cerrar modal si se hace click fuera de ella */
    let openCloseSide = document.getElementById("openCloseSide");    
    openCloseSide.addEventListener('click', checkModalToClose);
});

