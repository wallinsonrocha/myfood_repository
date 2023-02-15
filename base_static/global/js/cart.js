import { openBuyOption } from "./content-buy-description.js"

const urlFoodToCart = window.location
const urlToApiFoodToCart = `${urlFoodToCart.origin}/api/food/`
const qsCart = document.querySelector("#cart-products")
const totalPriceEle = document.querySelector("#total-price")
const createElToCart = (e) => document.createElement(e)

if(!localStorage.getItem("cart")){
    localStorage.setItem("cart", "[]")
}

function deleteOption(id){
    let cart = JSON.parse(localStorage.getItem("cart"))
    
    cart.forEach((f, i) => {
        if(f[0] == id){
            cart.splice(i, 1)
        }
    })

    localStorage.setItem("cart", JSON.stringify(cart))
    productsCart()
}

async function productsCart(){
    let response = await fetch(urlToApiFoodToCart)
    let data = await response.json()
    let results = await data.results  

    let totalPrice = 0

    let cart = JSON.parse(localStorage.getItem("cart"))
    
    qsCart.innerHTML = ""

    cart.forEach(p => {
        let food = results.filter(e => e.id == p[0]).shift()
        totalPrice += food.is_discount ? food.price_discount*p[1] : food.price*p[1]

        // Elements
        let product = createElToCart("div")
        let quantity = createElToCart("div")
        let imageName = createElToCart("div")
        let image = createElToCart("img")
        let name = createElToCart("span")
        let trash = createElToCart("button")

        // Classes
        product.classList.add("flex")
        product.classList.add("cart-product")
        product.classList.add("relative")
        imageName.classList.add("flex-image-name")
        quantity.classList.add("qnt-position")
        trash.classList.add("trash")

        // Append
        imageName.appendChild(image)
        imageName.appendChild(name)
        product.appendChild(imageName)
        product.appendChild(trash)

        if(p[1] > 1){
            product.appendChild(quantity)
        }

        // Content
        image.src = food.cover
        name.innerText = food.title
        quantity.innerText = p[1]
        trash.innerHTML = `
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.25 5.28836H16.875V4.03241C16.8725 3.25602 16.5952 2.51223 16.1034 1.96324C15.6117 1.41425 14.9454 1.10461 14.25 1.10185H9.75C9.05457 1.10461 8.38832 1.41425 7.89657 1.96324C7.40483 2.51223 7.12747 3.25602 7.125 4.03241V5.28836H3.75C3.45163 5.28836 3.16548 5.42068 2.9545 5.65622C2.74353 5.89176 2.625 6.21121 2.625 6.54431C2.625 6.87741 2.74353 7.19687 2.9545 7.4324C3.16548 7.66794 3.45163 7.80026 3.75 7.80026H4.125V22.0344C4.12746 22.5887 4.3258 23.1195 4.6769 23.5115C5.028 23.9035 5.50348 24.1249 6 24.1276H18C18.4965 24.1249 18.972 23.9035 19.3231 23.5115C19.6742 23.1195 19.8725 22.5887 19.875 22.0344V7.80026H20.25C20.5484 7.80026 20.8345 7.66794 21.0455 7.4324C21.2565 7.19687 21.375 6.87741 21.375 6.54431C21.375 6.21121 21.2565 5.89176 21.0455 5.65622C20.8345 5.42068 20.5484 5.28836 20.25 5.28836ZM9.375 4.03241C9.375 3.92137 9.41451 3.81489 9.48483 3.73638C9.55516 3.65786 9.65054 3.61376 9.75 3.61376H14.25C14.3495 3.61376 14.4448 3.65786 14.5152 3.73638C14.5855 3.81489 14.625 3.92137 14.625 4.03241V5.28836H9.375V4.03241ZM17.625 21.6157H6.375V7.80026H17.625V21.6157ZM10.875 11.1495V17.8479C10.875 18.181 10.7565 18.5004 10.5455 18.736C10.3345 18.9715 10.0484 19.1038 9.75 19.1038C9.45163 19.1038 9.16548 18.9715 8.9545 18.736C8.74353 18.5004 8.625 18.181 8.625 17.8479V11.1495C8.625 10.8164 8.74353 10.4969 8.9545 10.2614C9.16548 10.0258 9.45163 9.89352 9.75 9.89352C10.0484 9.89352 10.3345 10.0258 10.5455 10.2614C10.7565 10.4969 10.875 10.8164 10.875 11.1495ZM15.375 11.1495V17.8479C15.375 18.181 15.2565 18.5004 15.0455 18.736C14.8345 18.9715 14.5484 19.1038 14.25 19.1038C13.9516 19.1038 13.6655 18.9715 13.4545 18.736C13.2435 18.5004 13.125 18.181 13.125 17.8479V11.1495C13.125 10.8164 13.2435 10.4969 13.4545 10.2614C13.6655 10.0258 13.9516 9.89352 14.25 9.89352C14.5484 9.89352 14.8345 10.0258 15.0455 10.2614C15.2565 10.4969 15.375 10.8164 15.375 11.1495Z"
                fill="white" />
        </svg>
        `         

        // Events
        imageName.addEventListener("click", () => openBuyOption(p[0]))
        trash.addEventListener("click", () => deleteOption(p[0]))
        
        qsCart.appendChild(product)
    });

    totalPriceEle.innerHTML = `R$ ${(totalPrice).toFixed(2).replace(".", ",")}`
}  

productsCart()

export {productsCart}