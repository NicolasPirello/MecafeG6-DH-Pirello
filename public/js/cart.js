function minusValue(id){
    let input = document.querySelector('#item_' + id + ' input[type="number"]');
    if(input.value != 0){
        input.value = parseInt(input.value) - 1;
    }
}

function moreValue(id){
    let input = document.querySelector('#item_' + id + ' input[type="number"]');
    input.value = parseInt(input.value) + 1;
}

/* Pagina Checkout  */

let tableDetails = document.querySelector(".checkout__table")
let buttonTableHidden = document.getElementById("checkout__tableHidden")

buttonTableHidden.addEventListener ("click", () => {
    
    tableDetails.classList.toggle("checkout__table")

})

let dataDirectionBtn = document.getElementById("dataDirection-btn")
let directionHidden = document.getElementById("dataDirectionContainer")

dataDirectionBtn.addEventListener ("click", () => {
    directionHidden.classList.toggle("dataDirectionHidden")
})



let selectDirection = document.getElementById("checkout__selectDirection");
selectDirection.addEventListener ("change", () => {    
    let optionSelected = selectDirection.options[selectDirection.selectedIndex];
    let direction = JSON.parse(optionSelected.getAttribute('dataValue'));

    //llenar form direccion

    document.getElementById("checkout__direction").value = direction.name;
    document.getElementById("checkout__street").value = direction.street;
    document.getElementById("checkout__city").value = direction.city;
    document.getElementById("checkout__region").value = direction.region;
    document.getElementById("checkout__country").value = direction.country;
    document.getElementById("checkout__postalCode").value = direction.address_code;
    


})

