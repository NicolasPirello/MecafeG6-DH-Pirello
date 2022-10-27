/*  JavaScript del Header */

// Seleccion del Boton - Seleccion de los links para mostrarlos

const navToggle = document.querySelector("#navToggle")
const nav = document.querySelector("#nav-links")

// Agregar evento de click para el menu.

navToggle.addEventListener("click", () => {
    nav.classList.toggle('nav-open')
})

// Variables de cada uno de los items que quiero desplegar

const quienesSomos = document.getElementById("quienesSomos")
const navbarAdmin = document.getElementById("navbarAdmin")
const navbarPerfil = document.getElementById("navbarPerfil")

// Variables de Divs que queremos desplegar (Combinacion de ID con clase .nav-link-desplagable)

const divQuienesSomos = document.querySelector("#quienesSomos .nav-link-desplagable")
const divAdmin = document.querySelector("#navbarAdmin .nav-link-desplagable")
const divPerfil = document.querySelector("#navbarPerfil .nav-link-desplagable")

// TODO --------- NavBar Desplegables ----------

// Funcion para Reutilizar

function desplegar (selectorId, divDesplegar) {
    if(selectorId) {
        selectorId.addEventListener("click", () => {
            divDesplegar.classList.toggle("nav-link-aparecer")
            selectorId.classList.toggle("link-hover")
        })
    }
}

// Llamado a Funciones

desplegar(quienesSomos, divQuienesSomos)
desplegar(navbarAdmin, divAdmin)
desplegar(navbarPerfil, divPerfil)

// TODO --------- Añadir el total de productos en el Carrito ----------

async function getTotalCart() {
    // Solicitud GET (Request).
    let spanTotalCart = document.getElementById('totalCart');
    if(spanTotalCart){
        let response = await fetch('http://localhost:3030/cart/quantity');
        let totalCart = await response.json();
        spanTotalCart.textContent = totalCart.total;
    }
}

// Ejecutar estas funciones al cargar pagina

window.addEventListener('load', function() {
    getTotalCart();
});
