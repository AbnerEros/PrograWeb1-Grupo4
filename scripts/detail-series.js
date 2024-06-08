const SERIES_STRING = localStorage.getItem("series_list")
const SERIES_LIST = JSON.parse(SERIES_STRING)
const PREFIX_WIKIPEDIA = "https://es.wikipedia.org/wiki/"

const URL_VISTA = document.location.href
const SERIE_URL = new URL(URL_VISTA)
const SERIE_NAME = SERIE_URL.searchParams.get("name")

function getSeries() {
    let nodo_h2 = document.querySelector("h2");
    let nodo_desc = document.createTextNode(`${SERIES_LIST[SERIE_NAME].serie_name}`)
    nodo_h2.appendChild(nodo_desc)

    let nodo_h3 = document.querySelector("h3");
    let nodo_desc2 = document.createTextNode(`${SERIES_LIST[SERIE_NAME].desc}`)
    nodo_h3.appendChild(nodo_desc2)

    let nodo_h4 = document.querySelector("h4");

    let nodo_desc3
    if (SERIES_LIST[SERIE_NAME].season > 1) {
        nodo_desc3 = document.createTextNode(`${SERIES_LIST[SERIE_NAME].season} temporadas`)
    } else
    nodo_desc3 = document.createTextNode(`${SERIES_LIST[SERIE_NAME].season} temporada`)
    nodo_h4.appendChild(nodo_desc3)
}

getSeries()