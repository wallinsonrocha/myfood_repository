const url = window.location
const urlToVerify = `${url.origin}/auth/token/verify/`
const urlToRefresh = `${url.origin}/auth/token/refresh/`
const urlToLogout = `${url.origin}/logout/`

const qS = (e) => document.querySelector(e)
const creatEle = (e) => document.createElement(e)


async function logoutUser(){
    let tokenAccess = localStorage.getItem("access")

    let optionsLogout = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tokenAccess,
        }
    }

    fetch(urlToLogout, optionsLogout)
    .then((a) => {
        localStorage.removeItem("access")
    })            
    .then(()=>{
        window.location.replace(`${url.origin}/login/`)
    })
}

async function refreshToken(){
    let optionsRefres = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    return fetch(urlToRefresh, optionsRefres)
    .then(response => {
        if(response.status==200){
            response.json()
            .then(data => {
                localStorage.setItem("access", data.access)
            })
            return true
        }
        return false
    })
}

async function verifyLogin(){
    let access = localStorage.getItem("access")
    let data = {
        token: access
    }
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    return fetch(urlToVerify, options)
    .then(response => {
        if(response.status==200){
            return true
        } else {
            refreshToken()
            .then((resp)=>{
                return resp
            })           
        }
    })
}

// Para habilitar o logout
(() => {
    let token = localStorage.getItem("access")
    if(token){
        verifyLogin()
        .then(response => {
            if(response){
                let menu = qS("#menu-options ul") 
                let logout = creatEle("li")
                logout.setAttribute("id", "logout")
                logout.innerText = "Logout"
                logout.addEventListener('click', () => logoutUser())
    
                menu.appendChild(logout)            
            }
        })
    } else{
        let menu = qS("#menu-options ul") 
        let login = creatEle("li")
        let a = creatEle("a")
        a.href = "/login"
        login.appendChild(a)
        a.innerText = "Login"
        menu.appendChild(login)            

    }
})()


export {verifyLogin}
