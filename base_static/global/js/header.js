const q = (e) => document.querySelector(e)
const qA = (e) => document.querySelectorAll(e)

function openBuyOption(id){
    qs("body").style.overflowY = "hidden";
    let element = results.filter(e => e.id == id).shift()

    contentBuy.innerHTML = ""

    // Elements
    let infoBuy = createEl("div")
    let arrowDescExit = createEl("button")
    let imageFood = createEl("div")
    let image = createEl("img")
    let infosQuantityPrice = createEl("div")
    let title = createEl("h2")
    let quantityAndAddCart = createEl("div")
    let infosBuy = createEl("div")
    let rmvQuantity = createEl("button")
    let quantityInfoBuy = createEl("h2")
    let addQuantity = createEl("button")
    let addInTheCart = createEl("button")
    let totalPriceProduct = createEl("h3")


    // Classes
    infoBuy.classList.add("info-buy")
    imageFood.classList.add("image-food")
    infosQuantityPrice.classList.add("infos-quantity-price")
    quantityAndAddCart.classList.add("quantity-and-add-cart")
    infosBuy.classList.add("infos-buy")
    rmvQuantity.classList.add("rmv-quantity")
    quantityInfoBuy.classList.add("quantity-info-buy")
    addQuantity.classList.add("add-quantity")
    addInTheCart.classList.add("add-in-the-cart")
    totalPriceProduct.classList.add("total-price-product")

    // Id
    arrowDescExit.setAttribute("id", "arrow-buy-exit")

    // Context
    image.src = element.cover
    title.innerHTML = element.title
    quantityInfoBuy.innerHTML = verifyInCart(id)

    // Content svg
    arrowDescExit.innerHTML = `
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 21.1027L0 10.6693L13.3333 0.23584L15.7 2.08777L4.73333 10.6693L15.7 19.2507L13.3333 21.1027Z"
            fill="black" />
    </svg>
    `
    rmvQuantity.innerHTML = `
    <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0V4H0V0H12Z" fill="white" />
    </svg>                                
    `
    addQuantity.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.72458 18V0H11.2754V18H6.72458ZM0 11.2754V6.72458H18V11.2754H0Z" fill="white" />
    </svg>
    `
    addInTheCart.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 25.6667V14.6667H0V11H11V0H14.6667V11H25.6667V14.6667H14.6667V25.6667H11Z" fill="white"/>
    </svg>
    `
    
    // Append child
    contentBuy.appendChild(infoBuy)
    infoBuy.appendChild(imageFood)
    infoBuy.appendChild(arrowDescExit)
    imageFood.appendChild(image)
    infoBuy.appendChild(infosQuantityPrice)
    infosQuantityPrice.appendChild(title)
    infosQuantityPrice.appendChild(quantityAndAddCart)
    quantityAndAddCart.appendChild(infosBuy)
    infosBuy.appendChild(rmvQuantity)
    infosBuy.appendChild(quantityInfoBuy)
    infosBuy.appendChild(addQuantity)
    quantityAndAddCart.appendChild(addInTheCart)
    infosQuantityPrice.appendChild(totalPriceProduct)       

    // Events
    arrowDescExit.addEventListener("click", () => closeWindowBuy())
    addQuantity.addEventListener("click", () => fcAddQuantity(quantityInfoBuy.innerText))
    rmvQuantity.addEventListener("click", () => fcRmvQuantity(quantityInfoBuy.innerText))

    // Display
    infoDescBuy.style.display = "flex"
    contentBuy.style.display = "flex"
    setTimeout(function(){ 
        contentBuy.style.transform = "translateY(0)"
    }, 1);

    
    // Functions
    function fcAddQuantity(num){
        num++                                
        quantityInfoBuy.innerText = num
    }

    function fcRmvQuantity(num){
        if(num > 1){
            num--
            return quantityInfoBuy.innerText = num
        }    
    }
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
