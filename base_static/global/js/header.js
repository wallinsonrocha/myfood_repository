const q = (e) => document.querySelector(e)

const menuHamburguer =  q("#menu-hamburguer-mobile").addEventListener("click", function (event) {
    event.preventDefault()
    let menuOptions = q("#menu-options")

    if(menuOptions.classList.contains("menu-close")){
        menuOptions.classList.remove("menu-close")
        menuOptions.classList.add("menu-open")
    }

    else if(menuOptions.classList.contains("menu-open")){
        menuOptions.classList.remove("menu-open")
        menuOptions.classList.add("menu-close")
    } 
})

// Continuar aqui
const cartMenu = q()

