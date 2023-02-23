const q = (e) => document.querySelector(e)

function stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // remove espaços em branco no início e no final
    str = str.toLowerCase(); // transforma tudo em minúsculas
    str = str.replace(/[^a-z0-9\s-]/g, '') // remove caracteres que não são alfanuméricos, espaços ou hífens
             .replace(/[\s-]+/g, '-') // substitui espaços e hífens por um único hífen
             .replace(/^-+|-+$/g, ''); // remove hífens extras no início ou no final
    return str;
  }

const search = q("#search-button").addEventListener('click', ()=>{
    let value = q("#input-search").value
    const withoutAccents = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let slug = stringToSlug(withoutAccents)

    window.location.href = `/food/?search=${slug}`
})