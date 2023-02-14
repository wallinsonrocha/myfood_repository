const urlToApiFoods = `${url.origin}/api/food/`

let dados = [
    [food=1, quantity=2],
    [food=2, quantity=3]
]

localStorage.setItem("cart", JSON.stringify(dados))

// Local storage
if(!localStorage.hasOwnProperty("cart")){
    localStorage.setItem("cart", "[]")
}

// Fecth
(async function getData(){
    const response = await fetch(urlToApiFoods)
    const data = await response.json()
    const results = await data.results

    let obj = JSON.parse(localStorage.getItem("cart"))

    // Delete
    console.log(results)
})()


