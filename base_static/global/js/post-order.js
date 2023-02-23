const url = window.location
const urlToCart = `${url.origin}/api/cart/`
const urlToOrder = `${url.origin}/api/order/`

async function postOrder(cartIds){
    let tokenAccess = localStorage.getItem("access")
    
    let data = {
        cart: cartIds
    }

    let options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tokenAccess,
        },
        body: JSON.stringify(data)
    }

    fetch(urlToOrder, options)
    .then(() => {
        localStorage.setItem("cart", "[]")
        window.location.href = "/order/?page=1"
    })
}

async function postCart(foodId, qnt){
    let tokenAccess = localStorage.getItem("access")    
    
    let data = {
        food: foodId,
        quantity: qnt
    }

    let options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tokenAccess,
        },
        body: JSON.stringify(data)
    }

    return fetch(urlToCart, options)
    .then(resp => resp.json())
}

async function buyProducts() {
    let cartToOrder = []
    let cart = JSON.parse(localStorage.getItem("cart"));
    let promises = cart.map((p) => postCart(p[0], p[1]));
    let cartIds = await Promise.all(promises);
    
    cartIds.forEach(e => cartToOrder.push(e.id))

    postOrder(cartToOrder)  
  }


export {buyProducts}