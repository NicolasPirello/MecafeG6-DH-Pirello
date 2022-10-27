

let filtro = document.getElementById("aparecerFiltro")
let aparecerFiltro = document.querySelector(".listProduct__filtersChecks")

console.log(filtro)

filtro.addEventListener("click", () => {
    
    aparecerFiltro.classList.toggle("listProduct__filtersHidden")

})