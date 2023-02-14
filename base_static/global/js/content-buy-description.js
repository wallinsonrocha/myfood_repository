import { productsCart } from "./cart.js"

const urlFood = window.location
const urlToApiFood = `${urlFood.origin}/api/food/`

const q = (e) => document.querySelector(e)

const contentBuy = document.querySelector("#content-buy")
const contentDescription = q("#content-description")
const infoDescBuy = q("#infos-desc-buy")
const createEl = (e) => document.createElement(e)


function closeWindowBuy(){
    q("body").style.overflowY = "auto";

    contentBuy.style.transform = "translateY(200%)"

    setTimeout(function(){ 
        infoDescBuy.style.display = "none"
        contentBuy.style.display = "none"    
    }, 200);

    contentBuy.innerHTML = ""
}

function closeWindowDesc(){
    q("body").style.overflowY = "auto";

    contentDescription.style.transform = "translateY(200%)"

    setTimeout(function(){ 
        infoDescBuy.style.display = "none"
        contentDescription.style.display = "none"    
    }, 200);

    contentDescription.innerHTML = ""
}

function verifyInCartQuantity(id){
    let food = JSON.parse(localStorage.getItem("cart"))
    let quantity = 1
    food.forEach(f => {
        if(f[0] == id){
            quantity = f[1]
            return quantity
        }
    })
    return quantity
}

function fcAddCartInTheCart(id, quantity){
    let cart = JSON.parse(localStorage.getItem("cart"))
    let exist = false

    cart.forEach(f => {
        if(f[0] == id){
            exist = true
            return f[1] = quantity
        }
    })

    if(!exist){
        cart.push([id, quantity])
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    productsCart()
    closeWindowBuy()
}

async function openBuyOption(id){
    let response = await fetch(urlToApiFood)
    let data = await response.json()
    let results = await data.results    

    q("body").style.overflowY = "hidden";
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
    quantityInfoBuy.innerHTML = verifyInCartQuantity(id)
    totalPriceProduct.innerHTML = verifyInCartTotalPrice(id)

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
    addInTheCart.addEventListener("click", () => {
        fcAddCartInTheCart(element.id, parseInt(quantityInfoBuy.innerText))
    })

    // Display
    infoDescBuy.style.display = "flex"
    contentBuy.style.display = "flex"
    setTimeout(function(){ 
        contentBuy.style.transform = "translateY(0)"
    }, 10);

    
    // Functions
    function fcAddQuantity(num){
        num++                                
        quantityInfoBuy.innerText = num

        if(element.is_discount){
            let totalPrice = `R$ ${(element.price_discount*num).toFixed(2).replace(".", ",")}`
            totalPriceProduct.innerText = totalPrice            
        } else {            
            let totalPrice = `R$ ${(element.price*num).toFixed(2).replace(".", ",")}`
            totalPriceProduct.innerText = totalPrice            
        }
    }

    function fcRmvQuantity(num){
        if(num > 1){
            num--
            quantityInfoBuy.innerHTML = num

            if(element.is_discount){
                let totalPrice = `R$ ${(element.price_discount*num).toFixed(2).replace(".", ",")}`
                totalPriceProduct.innerText = totalPrice            
            } else {            
                let totalPrice = `R$ ${(element.price*num).toFixed(2).replace(".", ",")}`
                totalPriceProduct.innerText = totalPrice            
            }
        }    
    }

    function verifyInCartTotalPrice(id){
        let food = JSON.parse(localStorage.getItem("cart"))
        
        if(element.is_discount){
            let totalPrice = `R$ ${(element.price_discount).toFixed(2).replace(".", ",")}`
            
            food.forEach(f => {
                if(f[0] == id){
                    totalPrice = `R$ ${(element.price_discount*f[1]).toFixed(2).replace(".", ",")}` 
                    return totalPrice
                }
            })
            return totalPrice
        }

        let totalPrice = `R$ ${(element.price).toFixed(2).replace(".", ",")}`
            
            food.forEach(f => {
                if(f[0] == id){
                    totalPrice = `R$ ${(element.price*f[1]).toFixed(2).replace(".", ",")}` 
                    return totalPrice
                }
            })
            return totalPrice
    }
}

async function openDescOption(id){
    let response = await fetch(urlToApiFood)
    let data = await response.json()
    let results = await data.results    

    q("body").style.overflowY = "hidden";
    let element = results.filter(e => e.id == id).shift()

    contentDescription.innerHTML = ""

    // Elements
    let infoDesc = createEl("div")
    let arrowDescExit = createEl("button")
    let imageFood = createEl("div")
    let image = createEl("img")
    let descFood = createEl("div")
    let title = createEl("h2")
    let description = createEl("p")

    // Classes
    imageFood.classList.add("image-food")
    descFood.classList.add("desc-food")  

    // Id
    arrowDescExit.setAttribute("id", "arrow-desc-exit")

    // Context
    image.src = element.cover
    title.innerHTML = element.title
    description.innerHTML = element.description

    // Content svg
    arrowDescExit.innerHTML = `
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 21.1027L0 10.6693L13.3333 0.23584L15.7 2.08777L4.73333 10.6693L15.7 19.2507L13.3333 21.1027Z"
            fill="black" />
    </svg>
    `
    
    // Append child
    contentDescription.appendChild(infoDesc)
    infoDesc.appendChild(imageFood)
    infoDesc.appendChild(arrowDescExit)
    imageFood.appendChild(image)
    infoDesc.appendChild(descFood)
    descFood.appendChild(title)
    descFood.appendChild(description)

    // Events
    arrowDescExit.addEventListener("click", () => closeWindowDesc())

    // Display
    infoDescBuy.style.display = "flex"
    contentDescription.style.display = "flex"
    setTimeout(function(){ 
        contentDescription.style.transform = "translateY(0)"
    }, 10);
}

export {openBuyOption, openDescOption}