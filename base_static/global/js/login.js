import { verifyLogin } from "./verify-login.js"

const url = window.location
const urlToSubmit = `${url.origin}/auth/token/`

const qS = (e) => document.querySelector(e)
const form = qS("#login")
const loginUsername = qS("#login-username")
const loginPassword = qS("#login-password")


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(urlToSubmit, options)
    .then(response => {
        if(response.status==200){
            response.json()
            .then(data => {
                let access = JSON.stringify(data.access)
                localStorage.setItem("access", access)
            })
            .then(()=>{                
                window.location.replace(url.origin)
            })
        } else {
            response.json()
            .then(() => {
                let messageError = document.createElement("p")
                messageError.innerText = "Usuário ou senha incorreta!"
                messageError.setAttribute("id", "message-error")
                form.appendChild(messageError)
            })
        }
    })   
})

if(localStorage.getItem("access")){
    verifyLogin()
    .then(res => {
        res ? window.location.replace(url.origin) : null    
    })
}
