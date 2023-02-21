import { handleUserVerify } from "./verify-login.js"
const url = window.location
const urlToOrder = `${url.origin}/api${url.pathname}${url.search}`

const qS = (e) => document.querySelector(e)
const createEl = (e) => document.createElement(e)
const allOrders = qS("#all-order")

function createHeaderInfo(date, isConfirmed, isSend, isSending, totalPriceOrder) {
    const inProcess = (!isConfirmed && !isSending && !isSend)
    const inPreparation = (isConfirmed && !isSending && !isSend)
    const sending = (isConfirmed && isSending && !isSend)
    const send = (isConfirmed && isSending && isSend)

    // Create elements
    const order = createEl("div")
    const header = createEl("div")
    const dataTotal = createEl("div")
    const spanData = createEl("span")
    const totalPrice = createEl("span")
    const preparation = createEl("div")
    const h5 = createEl("h5")
    const spanIcon = createEl("span")

    // Class
    order.classList.add("order")
    header.classList.add("header")
    dataTotal.classList.add("data-total")
    preparation.classList.add("preparation")


    // Content
    spanData.innerText = `${date.day}/${date.month}/${date.year}`
    totalPrice.innerText = `Total: R$ ${(totalPriceOrder).toFixed(2).replace(".", ",")}`

    // Content with conditions
    if (inProcess) {
        h5.innerText = "Em processo"
        spanIcon.innerHTML = `
        <svg class="loading-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.8 12.8C9.22435 12.8 9.63131 12.9686 9.93137 13.2686C10.2314 13.5687 10.4 13.9757 10.4 14.4C10.4 14.8243 10.2314 15.2313 9.93137 15.5314C9.63131 15.8314 9.22435 16 8.8 16C8.37565 16 7.96869 15.8314 7.66863 15.5314C7.36857 15.2313 7.2 14.8243 7.2 14.4C7.2 13.9757 7.36857 13.5687 7.66863 13.2686C7.96869 12.9686 8.37565 12.8 8.8 12.8ZM3.7928 10.4C4.32323 10.4 4.83194 10.6107 5.20701 10.9858C5.58209 11.3609 5.7928 11.8696 5.7928 12.4C5.7928 12.9304 5.58209 13.4391 5.20701 13.8142C4.83194 14.1893 4.32323 14.4 3.7928 14.4C3.26237 14.4 2.75366 14.1893 2.37859 13.8142C2.00351 13.4391 1.7928 12.9304 1.7928 12.4C1.7928 11.8696 2.00351 11.3609 2.37859 10.9858C2.75366 10.6107 3.26237 10.4 3.7928 10.4ZM13.0552 10.8C13.4795 10.8 13.8865 10.9686 14.1866 11.2686C14.4866 11.5687 14.6552 11.9757 14.6552 12.4C14.6552 12.8243 14.4866 13.2313 14.1866 13.5314C13.8865 13.8314 13.4795 14 13.0552 14C12.6309 14 12.2239 13.8314 11.9238 13.5314C11.6238 13.2313 11.4552 12.8243 11.4552 12.4C11.4552 11.9757 11.6238 11.5687 11.9238 11.2686C12.2239 10.9686 12.6309 10.8 13.0552 10.8ZM14.8 7.4552C15.1183 7.4552 15.4235 7.58163 15.6485 7.80667C15.8736 8.03172 16 8.33694 16 8.6552C16 8.97346 15.8736 9.27868 15.6485 9.50373C15.4235 9.72877 15.1183 9.8552 14.8 9.8552C14.4817 9.8552 14.1765 9.72877 13.9515 9.50373C13.7264 9.27868 13.6 8.97346 13.6 8.6552C13.6 8.33694 13.7264 8.03172 13.9515 7.80667C14.1765 7.58163 14.4817 7.4552 14.8 7.4552ZM2 4.8C2.53043 4.8 3.03914 5.01071 3.41421 5.38579C3.78929 5.76086 4 6.26957 4 6.8C4 7.33043 3.78929 7.83914 3.41421 8.21421C3.03914 8.58929 2.53043 8.8 2 8.8C1.46957 8.8 0.960859 8.58929 0.585786 8.21421C0.210714 7.83914 0 7.33043 0 6.8C0 6.26957 0.210714 5.76086 0.585786 5.38579C0.960859 5.01071 1.46957 4.8 2 4.8ZM14.2288 4.1656C14.441 4.1656 14.6445 4.24989 14.7945 4.39991C14.9445 4.54994 15.0288 4.75343 15.0288 4.9656C15.0288 5.17777 14.9445 5.38126 14.7945 5.53129C14.6445 5.68131 14.441 5.7656 14.2288 5.7656C14.0166 5.7656 13.8131 5.68131 13.6631 5.53129C13.5131 5.38126 13.4288 5.17777 13.4288 4.9656C13.4288 4.75343 13.5131 4.54994 13.6631 4.39991C13.8131 4.24989 14.0166 4.1656 14.2288 4.1656ZM6.4 0C7.03652 0 7.64697 0.252856 8.09706 0.702944C8.54714 1.15303 8.8 1.76348 8.8 2.4C8.8 3.03652 8.54714 3.64697 8.09706 4.09706C7.64697 4.54714 7.03652 4.8 6.4 4.8C5.76348 4.8 5.15303 4.54714 4.70294 4.09706C4.25286 3.64697 4 3.03652 4 2.4C4 1.76348 4.25286 1.15303 4.70294 0.702944C5.15303 0.252856 5.76348 0 6.4 0V0ZM12.4 2.4C12.5061 2.4 12.6078 2.44214 12.6828 2.51716C12.7579 2.59217 12.8 2.69391 12.8 2.8C12.8 2.90609 12.7579 3.00783 12.6828 3.08284C12.6078 3.15786 12.5061 3.2 12.4 3.2C12.2939 3.2 12.1922 3.15786 12.1172 3.08284C12.0421 3.00783 12 2.90609 12 2.8C12 2.69391 12.0421 2.59217 12.1172 2.51716C12.1922 2.44214 12.2939 2.4 12.4 2.4Z"
                fill="black" />
        </svg>
        `
    }
    else if (inPreparation) {
        h5.innerText = "Preparando"
        spanIcon.innerHTML = `
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.4163 12.75V18.25H13.4997V15.5M4.33301 2.66667V18.25M1.58301 2.66667V5.41667C1.58301 6.14601 1.87274 6.84549 2.38846 7.36121C2.90419 7.87694 3.60366 8.16667 4.33301 8.16667C5.06235 8.16667 5.76183 7.87694 6.27755 7.36121C6.79328 6.84549 7.08301 6.14601 7.08301 5.41667V2.66667M14.4163 1.75V12.75H9.83301C9.81192 9.37575 10.0017 5.96117 14.4163 1.75Z"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>        
        `
    }
    else if (sending) {
        h5.innerText = "Enviando"
        spanIcon.innerHTML = `
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3"
                d="M3.6665 13.6667V15.3333H10.3332V10.3333H6.99984C5.1665 10.3333 3.6665 11.8333 3.6665 13.6667Z"
                fill="black" />
            <path
                d="M28.6668 3.66668C28.6668 1.83334 27.1668 0.333344 25.3335 0.333344H20.3335V3.66668H25.3335V8.08334L19.5335 15.3333H13.6668V7.00001H7.00016C3.31683 7.00001 0.333496 9.98334 0.333496 13.6667V18.6667H3.66683C3.66683 21.4333 5.90016 23.6667 8.66683 23.6667C11.4335 23.6667 13.6668 21.4333 13.6668 18.6667H21.1335L28.6668 9.25001V3.66668ZM8.66683 20.3333C7.75016 20.3333 7.00016 19.5833 7.00016 18.6667H10.3335C10.3335 19.5833 9.5835 20.3333 8.66683 20.3333ZM10.3335 15.3333H3.66683V13.6667C3.66683 11.8333 5.16683 10.3333 7.00016 10.3333H10.3335V15.3333Z"
                fill="black" />
            <path
                d="M5.3335 2H13.6668V5.33333H5.3335V2ZM28.6668 13.6667C25.9002 13.6667 23.6668 15.9 23.6668 18.6667C23.6668 21.4333 25.9002 23.6667 28.6668 23.6667C31.4335 23.6667 33.6668 21.4333 33.6668 18.6667C33.6668 15.9 31.4335 13.6667 28.6668 13.6667ZM28.6668 20.3333C27.7502 20.3333 27.0002 19.5833 27.0002 18.6667C27.0002 17.75 27.7502 17 28.6668 17C29.5835 17 30.3335 17.75 30.3335 18.6667C30.3335 19.5833 29.5835 20.3333 28.6668 20.3333Z"
                fill="black" />
        </svg>        
        `
    }
    else if (send) {
        h5.innerText = "Enviado"
        spanIcon.innerHTML = `
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.5 0C5.59896 0 0 5.59896 0 12.5C0 19.4062 5.59896 25 12.5 25C19.4062 25 25 19.4062 25 12.5C25 5.59375 19.4062 0 12.5 0ZM12.5 3.125C17.6771 3.125 21.875 7.32292 21.875 12.5C21.875 17.6771 17.6771 21.875 12.5 21.875C7.32292 21.875 3.125 17.6771 3.125 12.5C3.125 7.32292 7.32292 3.125 12.5 3.125ZM17.2552 6.46875C16.9167 6.46875 16.6042 6.59375 16.3802 6.89583C13.6719 10.5469 12.7865 11.9219 10.8594 15.7396C10.4219 15.1615 7.44271 11.9688 5.96875 10.8385C5.22917 10.2708 3.81771 12.2552 4.32292 12.7708C6.59375 15.1094 10.6302 20.3125 11.2865 20.2604C12.401 20.1719 15.1979 13.1354 19.0365 8.08854C19.4531 7.54688 18.2552 6.45833 17.2552 6.46875Z"
                fill="black" />
        </svg>
        `
    }

    // Append elements
    order.appendChild(header)
    header.appendChild(dataTotal)
    dataTotal.appendChild(spanData)
    dataTotal.appendChild(totalPrice)
    header.appendChild(preparation)
    preparation.appendChild(h5)
    preparation.appendChild(spanIcon)

    allOrders.appendChild(order)
}

async function orderClients() {
    handleUserVerify()
        .then(async resp => {
            if (resp) {
                const token = localStorage.getItem("access")
                let options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                }

                let response = await fetch(urlToOrder, options)
                let data = await response.json()
                let results = await data.results

                results.forEach(ele => {
                    let dateApi = ele.date_order.substring(0, 10)
                    let date = {
                        year: dateApi.substring(0, 4),
                        month: dateApi.substring(5, 7),
                        day: dateApi.substring(8),
                    }

                    // Criar a interface para mostrar as comidas compradas
                    console.log(ele)

                    createHeaderInfo(date, ele.is_confirmed, ele.is_send, ele.is_sending, ele.total_price_order)
                });

            }
        })
}

orderClients()