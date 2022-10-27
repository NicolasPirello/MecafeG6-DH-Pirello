//obtiene ruta de pagina actual
function getRoute(){
    return window.location.pathname;
}

function selectMenuPartial(){
    //obtener ruta de pagina
    let route = getRoute();
    //obtener li a que tenga la ruta
    let listLi = document.querySelectorAll('#menu_partial li');
    //recorrer los 'li' buscando el que tenga a con href igual a la ruta de pagina actual
    listLi.forEach((item) => {
        let href = item.querySelector('a').getAttribute('href');
        if(href === route || specialCases(href,route)) {
            item.classList.add('selected_menu_partial_item');
        }else{
            item.classList.remove('selected_menu_partial_item');
        }

    })

}

// En caso de que deba pintar href != route

function specialCases(href, route){

    switch(href){
        case '/product/list':
            if(route.includes('/product/edit/')){
                return true;
            }
            return false;
        case '/type-grinding/list':
            if(route.includes('/type-grinding/edit/')){
                return true;
            }

            return false;
        default:
            return false;
    }
}

//ejecutar estas funciones al cargar pagina

window.onload = function() {
    selectMenuPartial();   
};

