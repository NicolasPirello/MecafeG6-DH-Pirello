// seleccion del formulario
let form = document.getElementById('registerForm__form');

// seleccion de cada uno de los input
let registerName = document.getElementById("name_register");
let registerLastName = document.getElementById("lastName");
let registerEmail = document.getElementById("email");
let registerPhone = document.getElementById("phone");
let registerPassword = document.getElementById("password");
let registerConfirmPassword = document.getElementById("confirmPassword");

// Array de todos los input
let input = [registerName, registerLastName, registerEmail, registerPhone, registerPassword, registerConfirmPassword];


// Declaraciòn de expresiones regulares
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  lastName: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/, // 7 a 14 numeros.
  password: /^.{8,250}$/, // 8 a 250 digitos.
}

// Declaracion de objecto para validar si el campo esta correcto al enviar
let fields = {
  name: false,
  lastName: false,
  email: false,
  phone: false,
  password: false
}

// validacion de los campos del formulario
const validationsInputs = (expression, input, campo) => {
  if(expression.test(input.value)){
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.remove('registerForm_errorItem-incorrecto')
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.add('registerForm_errorItem-correcto')
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.add('fa-check-circle');
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.remove('fa-times-circle');
    document.getElementById(`menssageErrorGeneral_${campo}`).classList.remove('register_formErrorFrontGeneral-active');
    fields[campo] = true;
  }else {
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.add('registerForm_errorItem-incorrecto');
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.remove('registerForm_errorItem-correcto')
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.add('fa-times-circle');
    document.querySelector(`.registerForm_errorItem_${campo}`).classList.remove('fa-check-circle');
    document.getElementById(`menssageErrorGeneral_${campo}`).classList.add('register_formErrorFrontGeneral-active');
    fields[campo] = false;
  }
}

// validacion de la confirmacion de las contraseñas
const validationConfirmPassword= () =>{
  // se realiza los selectors
  let inputPassword = document.getElementById('password');
  let inputConfirmPassword = document.getElementById('confirmPassword');
  // se pone la condicion
  if (inputConfirmPassword.value == "" || inputPassword.value !== inputConfirmPassword.value){
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.add('registerForm_errorItem-incorrecto');
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.remove('registerForm_errorItem-correcto')
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.add('fa-times-circle');
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.remove('fa-check-circle');
    document.getElementById('menssageErrorGeneral_confirmPassword').classList.add('register_formErrorFrontGeneral-active');
    fields['password'] = false;
  }else{
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.remove('registerForm_errorItem-incorrecto');
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.add('registerForm_errorItem-correcto')
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.remove('fa-times-circle');
    document.querySelector('.registerForm_errorItem_confirmPassword').classList.add('fa-check-circle');
    document.getElementById('menssageErrorGeneral_confirmPassword').classList.remove('register_formErrorFrontGeneral-active');
    fields['password'] = true;
  }

}

// Validaciones de cada campo segùn la expresiones regulares ya definidas
let validationform = (e) => {
  switch (e.target.name) {
    case 'name' :
      validationsInputs(expressions.name, e.target, 'name');
    break;
    case 'lastName' :
      validationsInputs(expressions.lastName, e.target, 'lastName');
      break;
    case 'email' :
      validationsInputs(expressions.email, e.target, 'email');
      break;
    case 'phone' :
      validationsInputs(expressions.phone, e.target, 'phone');
      break;
    case 'password' :
      validationsInputs(expressions.password, e.target, 'password');
      validationConfirmPassword();
      break;
    case 'confirmPassword' :
      validationConfirmPassword();
      break;
  }

}

//Validaciones de cada input
let validationInputFocus = () => {

  if(name_register.value !== "") {
    name_register.focus()
  }
 
  if(lastName.value !== "") {
    lastName.focus()
  }

  if(email.value !== "") {
    email.focus()
  } 

  if(phone.value !== "") {
    phone.focus()
  }   

  if(password.value !== "") {
    password.focus()
  }   
}

// validacion cuando levantan tecla o le den fuera del formulario se ejecute
//y además monitorea varios eventos
 let validationmonitor = () => {
    input.forEach((input) => {
      input.addEventListener('keyup', validationform);
      input.addEventListener('blur', validationform);
  })
 } 

form.addEventListener('submit', (e) => {
  e.preventDefault();
// condicional que valida si todos los campos estàn diligenciados correctamente
  if(fields.name && fields.lastName && fields.email && fields.phone && fields.password){
      document.getElementById('registerForm__form').submit();
  }else {
    document.getElementById('menssageError').classList.add('registerForm__menssageError-active');
    validationInputFocus();
  }
})

// Ejecutamos un evento por cada input recorrido constantemente ya que la pagina se encuentra cargada.

validationmonitor();

// con esta funcion checkea todo de nuevo si el primer input es diferente de vacio
window.addEventListener("load", () => {
  if(name_register != null ) {
    validationInputFocus()
  }    
})

