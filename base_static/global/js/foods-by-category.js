const url = window.location
const urlToApi = `${url.origin}/api${url.pathname}${url.search}`

// Adicionar funcionalidade para abrir descrição e opção de compra

async function apiGet(){
    let response = await fetch(urlToApi)
    let data = await response.json()
    let results = await data.results

    const createEl = (e) => document.createElement(e)
    const principalConteiner = document.querySelector("#food-category")

    principalConteiner.innerHTML = ""

    results.forEach(d => {

        console.log(d)

        // Elements
        let container = createEl("div")
        let imageContainer = createEl("div")
        let image = createEl("img")
        let informationsFood = createEl("div")
        let title = createEl("h3")
        let priceAndOptions = createEl("div")
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

        // Append childs
        container.appendChild(imageContainer)
        imageContainer.appendChild(image)
        container.appendChild(informationsFood)
        informationsFood.appendChild(title)
        informationsFood.appendChild(priceAndOptions)
        priceAndOptions.appendChild(price)
        priceAndOptions.appendChild(buyDescription)
        buyDescription.appendChild(buyButton)
        buyDescription.appendChild(descriptionButton)     

        principalConteiner.appendChild(container)
    });
}

apiGet()
