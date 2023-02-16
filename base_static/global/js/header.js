import { verifyLogin } from "./verify-login.js"

const q = (e) => document.querySelector(e)
const qA = (e) => document.querySelectorAll(e)

if(window.location.pathname == "/"){
    let optionMenu = qA("#menu-options li")
    optionMenu[0].classList.add("selected")
}

const menuHamburguer =  q("#menu-hamburguer-mobile").addEventListener("click", function (){
    let menuOptions = q("#menu-options")
    let cartMenu = q("#cart-menu").classList
    let searchArea = q("#search-area").classList

    // Close cart if is open
    if(cartMenu.contains("cart-open")){
        cartMenu.remove("cart-open")
        cartMenu.add("cart-close")

        setTimeout(function(){ 
            cartMenu.add("none")        
        }, 200);
    }

    // Close search if is open
    if(searchArea.contains("search-open")){
        searchArea.remove("search-open")
        searchArea.add("search-close")
    }

    // Manu ID configuration

    if(menuOptions.classList.contains("menu-close")){
        menuOptions.classList.remove("menu-close")
        menuOptions.classList.add("menu-open")

        let menuBars = qA(".menu-bars")

        menuBars[1].style.width = "0.625rem"
        menuBars[2].style.width = "0.375rem"
    }

    else if(menuOptions.classList.contains("menu-open")){
        menuOptions.classList.remove("menu-open")
        menuOptions.classList.add("menu-close")

        let menuBars = qA(".menu-bars")

        menuBars[1].style.width = "1.125rem"
        menuBars[2].style.width = "1.125rem"
    }     
})

const cartMenu = q("#cart").addEventListener("click", function (){
    let cartMenu = q("#cart-menu").classList
    let menuOptions = q("#menu-options")
    let searchArea = q("#search-area").classList

    // Close search if is open
    if(searchArea.contains("search-open")){
        searchArea.remove("search-open")
        searchArea.add("search-close")
    }
    
    // Close menu if is open
    if(menuOptions.classList.contains("menu-open")){
        menuOptions.classList.remove("menu-open")
        menuOptions.classList.add("menu-close")

        let menuBars = qA(".menu-bars")

        menuBars[1].style.width = "1.125rem"
        menuBars[2].style.width = "1.125rem"
    } 

    // Cart ID configuration

    if(cartMenu.contains("cart-close")){
        cartMenu.remove("none")

        setTimeout(function(){ 
            cartMenu.remove("cart-close")
            cartMenu.add("cart-open")            
        }, 1);          
    }

    else if(cartMenu.contains("cart-open")){
        cartMenu.remove("cart-open")
        cartMenu.add("cart-close")

        setTimeout(function(){ 
            cartMenu.add("none")        
        }, 200);
    }
})

const searchArea = q("#search").addEventListener("click", function () {
    let searchArea = q("#search-area").classList
    let cartMenu = q("#cart-menu").classList
    let menuOptions = q("#menu-options")

    // Close cart if is open
    if(cartMenu.contains("cart-open")){
        cartMenu.remove("cart-open")
        cartMenu.add("cart-close")

        setTimeout(function(){ 
            cartMenu.add("none")        
        }, 200);
    }

    // Close menu if is open
    if(menuOptions.classList.contains("menu-open")){
        menuOptions.classList.remove("menu-open")
        menuOptions.classList.add("menu-close")

        let menuBars = qA(".menu-bars")

        menuBars[1].style.width = "1.125rem"
        menuBars[2].style.width = "1.125rem"
    } 

    // Search ID configuration

    if(searchArea.contains("search-close")){
        searchArea.remove("search-close")
        searchArea.add("search-open")
    }
    else if(searchArea.contains("search-open")){
        searchArea.remove("search-open")
        searchArea.add("search-close")
    }
})
