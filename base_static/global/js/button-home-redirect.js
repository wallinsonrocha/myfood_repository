const url = window.location.origin

const b = (e) => document.querySelector(e)

b("#r-salgados").addEventListener("click", function (){
    window.location.href = `${url}/food/?category_id=1`;
})

b("#r-bolos").addEventListener("click", function (){
    window.location.href = `${url}/food/?category_id=3`;
})

b("#r-doces").addEventListener("click", function (){
    window.location.href = `${url}/food/?category_id=2`;
})

b("#r-bebidas").addEventListener("click", function (){
    window.location.href = `${url}/food/?category_id=4`;
})