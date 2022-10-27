function addDirection(){
    togglesButtonList();
    togglesFormRegister();
}

function cancelFormRegisterDirection(){
    togglesButtonList();
    togglesFormRegister();
}

function cancelFormEditDirection(){
    togglesButtonList();
    togglesFormEdit();
}

function togglesButtonList(){
    let button = document.querySelector(".btnAddDirection");
    button.classList.toggle("display-none");

    let directions = document.querySelector(".list_directions");
    directions.classList.toggle("display-none");
}

function togglesFormRegister(){   
    let formDirection = document.querySelector(".form-direction-create");
    formDirection.classList.toggle("display-none");
}

function togglesFormEdit(){   
    let formDirection = document.querySelector(".form-direction-edit");
    formDirection.classList.toggle("display-none");
}

function completeForm(direction){
    togglesButtonList();
    togglesFormEdit();
    document.querySelector("#editId").value = direction.id;
    document.querySelector("#editName").value = direction.name;
    document.querySelector("#editStreet").value = direction.street;
    document.querySelector("#editCity").value = direction.city;
    document.querySelector("#editRegion").value = direction.region;
    document.querySelector("#editCountry").value = direction.country;
    document.querySelector("#editAddress_code").value = direction.address_code;
    document.querySelector("#editDefaultValue").checked = direction.default;
}