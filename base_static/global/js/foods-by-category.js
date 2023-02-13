const url = window.location
const urlToApi = `${url.origin}/api${url.pathname}${url.search}`
const qs = (e) => document.querySelector(e)
const createEl = (e) => document.createElement(e)

const infoDescBuy = qs("#infos-desc-buy")
const principalConteiner = document.querySelector("#food-category")
const contentBuy = document.querySelector("#content-buy")
const contentDescription = qs("#content-description")

async function apiGet(){
    let response = await fetch(urlToApi)
    let data = await response.json()
    let results = await data.results

    principalConteiner.innerHTML = ""

    // Buy interface
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
        arrowDescExit.innerHTML = `
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 21.1027L0 10.6693L13.3333 0.23584L15.7 2.08777L4.73333 10.6693L15.7 19.2507L13.3333 21.1027Z"
                fill="black" />
        </svg>
        `
        infoBuy.appendChild(arrowDescExit)
        image.src = element.cover
        title.innerHTML = element.title
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
        addQuantity.addEventListener("click", () => fcAddQuantity())
        rmvQuantity.addEventListener("click", () => fcRmvQuantity())

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
                return quantityInfoBuy.innerHTML = num--
            }    
        }
    }

    results.forEach(d => {

        console.log(d)

        // Elements
        let container = createEl("div")
        let imageContainer = createEl("div")
        let image = createEl("img")
        let informationsFood = createEl("div")
        let title = createEl("h3")
        let priceAndOptions = createEl("div")
        let pricesDive = createEl("div")
        let priceDiscount = createEl("span")
        let price = createEl("span")
        let buyDescription = createEl("div")
        let buyButton = createEl("button")
        let descriptionButton = createEl("button")

        // Add src image and context
        image.src = d.cover
        title.innerHTML = `${d.title}`
        price.innerHTML = `R$ ${(d.price).toFixed(2).replace(".", ",")}`

        buyButton.innerHTML = `
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 25.6667V14.6667H0V11H11V0H14.6667V11H25.6667V14.6667H14.6667V25.6667H11Z" fill="white"/>
        </svg>        
        `
        descriptionButton.innerHTML = `
        <svg width="29" height="9" viewBox="0 0 29 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.6667 4.5013C21.6667 3.55094 22.0443 2.63951 22.7163 1.9675C23.3883 1.2955 24.2997 0.917969 25.2501 0.917969C26.2004 0.917969 27.1119 1.2955 27.7839 1.9675C28.4559 2.63951 28.8334 3.55094 28.8334 4.5013C28.8334 5.45166 28.4559 6.3631 27.7839 7.0351C27.1119 7.70711 26.2004 8.08464 25.2501 8.08464C24.2997 8.08464 23.3883 7.70711 22.7163 7.0351C22.0443 6.3631 21.6667 5.45166 21.6667 4.5013ZM10.9167 4.5013C10.9167 3.55094 11.2943 2.63951 11.9663 1.9675C12.6383 1.2955 13.5497 0.917969 14.5001 0.917969C15.4504 0.917969 16.3619 1.2955 17.0339 1.9675C17.7059 2.63951 18.0834 3.55094 18.0834 4.5013C18.0834 5.45166 17.7059 6.3631 17.0339 7.0351C16.3619 7.70711 15.4504 8.08464 14.5001 8.08464C13.5497 8.08464 12.6383 7.70711 11.9663 7.0351C11.2943 6.3631 10.9167 5.45166 10.9167 4.5013ZM0.166748 4.5013C0.166748 3.55094 0.544277 2.63951 1.21628 1.9675C1.88829 1.2955 2.79972 0.917969 3.75008 0.917969C4.70044 0.917969 5.61188 1.2955 6.28388 1.9675C6.95589 2.63951 7.33341 3.55094 7.33341 4.5013C7.33341 5.45166 6.95589 6.3631 6.28388 7.0351C5.61188 7.70711 4.70044 8.08464 3.75008 8.08464C2.79972 8.08464 1.88829 7.70711 1.21628 7.0351C0.544277 6.3631 0.166748 5.45166 0.166748 4.5013Z"
                fill="white" />
        </svg>
        `

        // Add classes
        container.classList.add("container-food")
        imageContainer.classList.add("image-food")
        title.classList.add("title-food")
        priceAndOptions.classList.add("price-and-options")
        buyDescription.classList.add("buy-description")
        buyButton.classList.add("buy-button")
        descriptionButton.classList.add("description-button")
        pricesDive.classList.add("price-divisor")

        // If is discount
        if(d.is_discount){
            price.innerHTML = `R$ ${(d.price).toFixed(2).replace(".", ",")}`
            price.classList.add("old-price")
            price.appendChild(priceDiscount)

            pricesDive.appendChild(price)
            priceDiscount.innerHTML = `R$ ${(d.price_discount).toFixed(2).replace(".", ",")}`
            pricesDive.appendChild(priceDiscount)
        }        
        
        // Append childs
        container.appendChild(imageContainer)
        imageContainer.appendChild(image)
        container.appendChild(informationsFood)
        informationsFood.appendChild(title)
        informationsFood.appendChild(priceAndOptions)
        pricesDive.appendChild(price)
        priceAndOptions.appendChild(pricesDive)
        priceAndOptions.appendChild(buyDescription)
        buyDescription.appendChild(buyButton)
        buyDescription.appendChild(descriptionButton)    
        
        // Add events
        buyButton.addEventListener("click", () =>openBuyOption(d.id))

        principalConteiner.appendChild(container)
    });


    // Functions
    function closeWindowBuy(){
        qs("body").style.overflowY = "auto";
    
        contentBuy.style.transform = "translateY(200%)"
    
        setTimeout(function(){ 
            contentBuy.style.display = "none"
            infoDescBuy.style.display = "none"
            contentDescription.style.display = "none"    
        }, 200);
    }
}


apiGet()
