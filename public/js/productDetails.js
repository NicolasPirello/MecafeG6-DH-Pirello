let addOne = document.querySelector("#addOne");
let userLogged = addOne.getAttribute("userActive");
let removeOne = document.querySelector("#removeOne")
let quantity = document.querySelector("#quantity")


let inicio = 1; //se inicializa una variable en 0

function aumentar () {
    quantity.value = ++inicio;
}

function disminuir () { // se crean la funcion. // Se obtiene el valor del input, y se decrementa en 1 el valor que tenga.
    if (inicio > 0){
        quantity.value = --inicio;
    }
}

// ----------------------------------

addOne.addEventListener("click", () => {
    if(userLogged == 'true'){
        aumentar();
    }else{
        alert("Debe estar logeado para añadir al carrito");
        openModal('modalLogin');
    }
})

removeOne.addEventListener("click", () => {
    disminuir()
})

let inputIdProductGrame = document.getElementById('idProductGrame');

inputIdProductGrame.addEventListener("change", () => {
    let option = inputIdProductGrame.options[inputIdProductGrame.selectedIndex];
    let productPrice = document.getElementById('productPrice');
    productPrice.textContent = option.getAttribute('priceValue') + " USD";
})

let formulario = document.getElementById("addProductCart");

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    let inputIdProductGrame = document.getElementById('idProductGrame');
    let inputIdProductTypeGrinding = document.getElementById('idProductTypeGrinding');
    let quantity = document.getElementById('quantity');

    if(userLogged != 'true'){
        alert("Debe estar logeado para añadir al carrito");
        openModal('modalLogin');
    }else{
        if(isNaN(inputIdProductGrame.value) || isNaN(inputIdProductTypeGrinding.value)){
            alert("Elige las opciones del producto antes de añadir este producto a tu carrito.");
        }else{
            formulario.submit();
        }
    }
   
})