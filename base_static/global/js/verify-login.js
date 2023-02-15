const url = window.location
const urlToVerify = `${url.origin}/auth/token/verify/`
const urlToRefresh = `${url.origin}/auth/token/refresh/`
const urlToLogout = `${url.origin}/logout/`

const qS = (e) => document.querySelector(e)
const creatEle = (e) => document.createElement(e)


async function logoutUser(){
    let optionsLogout = {
        method: 'POST',
        headers: { 
            // 'Authorization': `Bearer ${tokenAccess}`,
            'Content-Type': 'application/json'
        },
    }

    fetch(urlToLogout, optionsLogout)
    .then((a) => {
        console.log(a)
        localStorage.removeItem("access")
    })            
    .then(()=>{
        window.location.replace(`${url.origin}/login/`)
    })
}

async function refreshToken(){
    let optionsRefres = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
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
    }
})()


export {verifyLogin}
