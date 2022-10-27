/* Estilos: 
.createProduct__inputBox-isInvalid : Hace que la linea del input sea ROJA y de 2px
.createProduct__errorValidation : Es el texto que esta mal, la clase es en todas las mismas.
.createProduct__errorValidationActive : Si hay un error en la validacion agrega el texto. */

// TODO -------------------------------- Expresiones Regulares ---------------------------------------------------------

const expresiones = {
    
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    nameProduct: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
    descripcionProducto: /^[a-zA-ZÀ-ÿ\s_.+-]{16,500}$/, // Letras y espacios, pueden llevar acentos. Tambien guion bajo, medio y mas
    password: /^.{4,12}$/, // 4 a 12 digitos.
    price: /^[0-9]+\.?[0-9]*$/, // 4 a 12 digitos. Se admiten numeros decimales.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

// TODO -------------------------------- Objeto Campos para saber si un campo esta o no validado correctamente ---------------------------------------------------------

let campos = {
    nameProduct: false,
    priceProduct1: false,
    priceProduct2: false,
    priceProduct3: false,
    descriptionProduct: false,
    idCategoriesDiv: false
}

// TODO -------------------------------- Selectores de Inputs basicos y Creacion de ARRAY General ---------------------------------------------------------

// Tomamos el Formulario completo para poder manipularlo.
const formulario = document.getElementById("formProductCreate");

// Vamos a crear un selector para cada input
const nameProduct = document.getElementById("nameProduct");
const weightProduct1 = document.getElementById("weightProduct1");
const priceProduct1 = document.getElementById("priceProduct1");
const weightProduct2 = document.getElementById("weightProduct2");
const priceProduct2 = document.getElementById("priceProduct2");
const weightProduct3 = document.getElementById("weightProduct3");
const priceProduct3 = document.getElementById("priceProduct3");
const imageProduct = document.getElementById("imageProduct");
const descriptionProduct = document.getElementById("descriptionProduct");

// Crearemos un array con esos inputs
const inputsArray = [nameProduct, weightProduct1, priceProduct1, weightProduct2, priceProduct2, weightProduct3, priceProduct3, imageProduct, descriptionProduct]


// TODO -------------------------------- Checkbox (Corroborar y Estilos) ---------------------------------------------------------

// Solo aca debere usar querySelectorAll porque debo seleccionar todos los checkboxs que tienen como nombre idCategories

const idCategoriesDiv = document.getElementById("idCategoriesDiv");
const idCategoriesNew = document.querySelectorAll("input[type=checkbox][name=idCategories]");
let enabledIdCategories = []

// Estoy iterando sobre todos los input tipo checkbox con name idCategories para poder filtrar los de valor checked y guardalos en un array.

idCategoriesNew.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        enabledIdCategories = 
        Array.from(idCategoriesNew) // Convertir los checkbox en un array con map.
        .filter(i => i.checked) // Filtrar los que no estan siendo usados.
        .map(i => i.value) //  map para extraer solo los valores de casilla verificados.
        console.log(enabledIdCategories)
    })
});

// Hago un evento sobre el documento que tiene todos los inputs de idCategoriesDiv que es el div, cada vez que eso cambie corroboro si en el array que cree antes "enabledIdCategories"
// Existe algun dato, en ese caso quiere decir que hay algun valor con checked, entonces ahi paso el campo idCategoriesDiv del objeto "campos" a true, con el fin de avisar que todavia no se pasaron 
// todas las validaciones.

idCategoriesDiv.addEventListener("change", () => {
    
    if (enabledIdCategories.length > 0) {
        document.getElementById(`createProduct__lineError`).classList.remove("createProduct__inputBox-isInvalid")
        document.querySelector(`#idCategoriesDiv .createProduct__errorValidation`).classList.remove("createProduct__errorValidationActive")
        campos.idCategoriesDiv = true;
    } else {
        document.getElementById(`createProduct__lineError`).classList.add("createProduct__inputBox-isInvalid")
        document.querySelector(`#idCategoriesDiv .createProduct__errorValidation`).classList.add("createProduct__errorValidationActive")
        campos.idCategoriesDiv = false;
    }
})

// Creo una funcion para corroborar los checked en caso de que la pagina haya convertido el campo.idCategories en false, para devolverlo a true mientras tenga
// campos cheked marcado

let corroborarCheked = () => {
    
    for (let i = 0 ; i < idCategoriesNew.length ; i++) {
        
        if(idCategoriesNew[i].checked == true){
            campos.idCategoriesDiv = true
            console.log("Ahora hay un campo que es verdadero de nuevo")
        }
    }
}

// Eventos para los Checked que se ejecuta solo cuando la pagina se recarga.
// Solo sirve para mostrar el mensaje de entrada
// Comprueba si cuando la pagina se carga hay checked marcados, en caso de que los haya no los haya agrega los estilos para cambiar los mensajes

let cantidadNew = 0 

for (let i = 0 ; i < idCategoriesNew.length ; i++) {
    
    if(idCategoriesNew[i].checked == false){
        cantidadNew = cantidadNew + 1
    }
}

if (cantidadNew == 6) {
    document.getElementById(`createProduct__lineError`).classList.add("createProduct__inputBox-isInvalid")
    document.querySelector(`#idCategoriesDiv .createProduct__errorValidation`).classList.add("createProduct__errorValidationActive")
}


// TODO -------------------------------- Switch para detectar que campos son afectados y Ejecutar la Validacion ---------------------------------------------------------

const validarFormulario = (e) => {
    
    // Vamos primeramente a comprobar que se ejecute la funcion SOLO en el input donde estamos parados.
    // Eso lo podemos realizar con el target del elemento, y ahi encontrar su name.
    // Luego creamos casos para cada uno de esos names.
    // Luego en cada caso creamos un if para comprobar la expresion regular que usemos con .test
    // Dentro de test llamamos a e.target.value quien nos permite acceder al valor que estamos escribiendo.

    switch (e.target.name) {

        case "nameProduct" :
            validarCampo(expresiones.nameProduct, e.target, "nameProduct");
        break;

        case "priceProduct1" :
            validarCampo(expresiones.price, e.target, "priceProduct1");
        break;

        case "priceProduct2" :
            validarCampo(expresiones.price, e.target, "priceProduct2");
        break;

        case "priceProduct3" :
            validarCampo(expresiones.price, e.target, "priceProduct3");
        break;

        case "descriptionProduct" :
            validarCampo(expresiones.descripcionProducto, e.target, "descriptionProduct");
        break;
        
    }

} 

// TODO -------------------------------- Funciones que le dan estilos y añaden los mensajes (Solo de los Inputs Comunes). ---------------------------------------------------------

// ` Esta funcion es la encargada de Validar el campo y cambiar los estilos de cada uno de ellos
// expresion : 
// input: e.target.name
// campo: 

const validarCampo = (expresion, input, campo) => {

    if(expresion.test(input.value)) {
        document.getElementById(`${campo}`).classList.remove("createProduct__inputBox-isInvalid")
        document.getElementById(`${campo}`).classList.add("createProduct__inputBox-isValid")
        document.querySelector(`#createProduct__${campo} .createProduct__errorValidation`).classList.remove("createProduct__errorValidationActive")
        campos[campo] = true
    } else {
        document.getElementById(`${campo}`).classList.add("createProduct__inputBox-isInvalid")
        document.getElementById(`${campo}`).classList.remove("createProduct__inputBox-isValid")
        document.querySelector(`#createProduct__${campo} .createProduct__errorValidation`).classList.add("createProduct__errorValidationActive")
        campos[campo] = false
    }

}

// TODO -------------------------------- Funciones Varias ---------------------------------------------------------

let corroborarFocusInputs = () => {

    if(nameProduct.value != null) {
        nameProduct.focus()
    }
    if(priceProduct1.value != null) {
        priceProduct1.focus()
    }
    if(priceProduct2.value != null) {
        priceProduct2.focus()
    }
    if(priceProduct3.value != null) {
        priceProduct3.focus()
    }
    if(descriptionProduct.value != null) {
        descriptionProduct.focus()
    }
    if(imageProduct.value != null) {
        imageProduct.focus()
    }
}

let monitoreoValidacionesFront = () => {
    inputsArray.forEach( input => {
    // Esto lo que hace es ejecutar una funcion en varios eventos, los monitorea.
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
    })
}


// TODO -------------------------------- Accion al Submit del Formulario ---------------------------------------------------------

// Vamos a quitar primeramente el envio.

formulario.addEventListener("submit", (e) => {

    e.preventDefault()

    if (campos.nameProduct && campos.priceProduct1 && campos.priceProduct2 && campos.priceProduct3 && campos.descriptionProduct && campos.idCategoriesDiv) {
        document.getElementById('formProductCreate').submit();
    } else {
        document.getElementById("createProduct__errorFormularioCreateProduct").classList.add("createProduct__errorFormularioActive")
        corroborarFocusInputs()
        corroborarCheked()
    }

})

// TODO -------------------------------- Ejecucion constante de las validaciones ---------------------------------------------------------

// Ejecutamos un evento por cada input recorrido constantemente ya que la pagina se encuentra cargada.

monitoreoValidacionesFront();

// TODO -------------------------------- Arreglo al envio de POST de Validaciones BackEnd ---------------------------------------------------------

// Esta funcion lo que hace es que al cargar la pagina se pregunta ¿El name esta vacio? En caso de que si no hace absolutamente nada, peeeero
// si el name contiene algo lo que hace es literalmente checkear todo de nuevo. Lo ideal creo seria hacer un for y preguntarle si algun
// valor contiene algo pero lo hice para probar y queda asi momentaneamente, despues lo arreglo aunque el resultado seria el mismo.

window.addEventListener("load", () => {
    if(nameProduct.value != "") {
        corroborarFocusInputs()
        corroborarCheked()
    }    
})