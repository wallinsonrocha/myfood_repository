const urlFood = window.location
const urlToApiFood = `${urlFood.origin}/api/food/`

// Criar interface para a descrição

const q = (e) => document.querySelector(e)

const contentBuy = document.querySelector("#content-buy")
const contentDescription = q("#content-description")
const infoDescBuy = q("#infos-desc-buy")
const createEl = (e) => document.createElement(e)

function closeWindowBuy(){
    q("body").style.overflowY = "auto";

    contentBuy.style.transform = "translateY(200%)"

    setTimeout(function(){ 
        contentBuy.style.display = "none"
        infoDescBuy.style.display = "none"
        contentDescription.style.display = "none"    
    }, 200);
}

function verifyInCart(id){
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
            return quantityInfoBuy.innerHTML = num
        }    
    }
}

export {openBuyOption}