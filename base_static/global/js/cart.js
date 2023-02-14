
let obj = [
    [food=1, quantity=2],
    [food=2, quantity=3]
]

localStorage.setItem("cart", JSON.stringify(obj))

if(!localStorage.getItem("cart")){
    localStorage.setItem("cart", "[]")
}

