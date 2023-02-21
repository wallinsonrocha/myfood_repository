const urls = {
    verify: `${window.location.origin}/auth/token/verify/`,
    refresh: `${window.location.origin}/auth/token/refresh/`,
    logout: `${window.location.origin}/logout/`
}

const qS = (e) => document.querySelector(e)
const creatEle = (e) => document.createElement(e)

async function handleUserVerify(){
    const access = localStorage.getItem("access")
    if (!access) {
        return false
    }

    const response = await verifyToken(access)
    if (response) {
        return true
    } else {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
            return true
        } else {
            return false
        }
    }
}

async function handleUserAction() {
    const access = localStorage.getItem("access")
    if (!access) {
        createLoginElement()
        return false
    }

    const response = await verifyToken(access)
    if (response) {
        createLogoutElement()
    } else {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
            createLogoutElement()
        } else {
            createLoginElement()
        }
    }
    return response
}

async function verifyToken(token) {
    const data = { token }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    const response = await fetch(urls.verify, options)

    if(response.status === 401){
        location.reload()
    }

    return response.status === 200
}

async function refreshAccessToken() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(urls.refresh, options)
    if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem("access", data.access)
        return true
    }
    return false
}

async function logoutUser() {
    const token = localStorage.getItem("access")
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await fetch(urls.logout, options)
    localStorage.removeItem("access")
    window.location.replace(`${window.location.origin}/login/`)
}

function createLoginElement() {
    const menu = qS("#menu-options ul")
    const login = creatEle("li")
    const a = creatEle("a")
    a.href = "/login"
    a.innerText = "Login"
    login.appendChild(a)
    menu.appendChild(login)
}

function createLogoutElement() {
    const menu = qS("#menu-options ul")
    const logout = creatEle("li")
    logout.setAttribute("id", "logout")
    logout.innerText = "Logout"
    logout.addEventListener('click', logoutUser)
    menu.appendChild(logout)
}

handleUserAction()

export { handleUserVerify }