const PREFIX_WIKIPEDIA = "https://es.wikipedia.org/wiki/"
const PREFIX_YOUTUBE_IFRAME = "https://www.youtube.com/embed/"
const PREFIX_YOUTUBE_VIDEO = "https://www.youtube.com/watch?v="
const PAGE = window.location.pathname.split("/").pop();
const PAGE_SUFIX = PAGE.split("-").pop().split(".").shift();
const MOVIES_PAGE = "movies"
const SERIES_PAGE = "series"
const STORAGE_MOVIES = "movies_list"
const STORAGE_SERIES = "series_list"

let STORAGE_LINK;
if ( PAGE_SUFIX == MOVIES_PAGE )
    STORAGE_LINK = STORAGE_MOVIES
else if ( PAGE_SUFIX == SERIES_PAGE )
    STORAGE_LINK = STORAGE_SERIES

const CONTENT_STRING = localStorage.getItem(STORAGE_LINK)
const CONTENT_LIST = JSON.parse(CONTENT_STRING)
const URL_VISTA = document.location.href
const URL_GEN = new URL(URL_VISTA)
const ACTUAL_ID = URL_GEN.searchParams.get("id")

function getMovieDetails() {
    let nodo_iframe = document.querySelector(".details-iframe iframe")
    let nodo_video_a = document.querySelector(".details-iframe a")
    nodo_iframe.src = PREFIX_YOUTUBE_IFRAME + CONTENT_LIST[ACTUAL_ID].trailer_id
    nodo_video_a.href = PREFIX_YOUTUBE_VIDEO + CONTENT_LIST[ACTUAL_ID].video_id

    let nodo_title = document.querySelector("#movie-title");
    let nodo_new_title = document.createTextNode(`${CONTENT_LIST[ACTUAL_ID].serie_name}`)
    nodo_title.appendChild(nodo_new_title)

    let nodo_duration = document.querySelector("#movie-duration");
    let hours = Math.floor(CONTENT_LIST[ACTUAL_ID].duration / 60)
    let minutes = CONTENT_LIST[ACTUAL_ID].duration % 60
    let nodo_new_duration = document.createTextNode(`${hours}h ${minutes}m`)
    nodo_duration.appendChild(nodo_new_duration)

    if ( CONTENT_LIST[ACTUAL_ID].ext_duration > 0 ) {
        let nodo_ext_duration = document.querySelector("#movie-ext-duration");
        let ext_hours = Math.floor(CONTENT_LIST[ACTUAL_ID].ext_duration / 60)
        let ext_minutes = CONTENT_LIST[ACTUAL_ID].ext_duration % 60
        let nodo_new_ext_duration = document.createTextNode(`${ext_hours}h ${ext_minutes}m`)
        nodo_ext_duration.appendChild(nodo_new_ext_duration)
    } else {
        // Para las películas que no tengan versión extendida, no quiero mostrar esa sección
        let nodo_ext_duration_container = document.querySelector("#movie-ext-duration-container")
        nodo_ext_duration_container.style.display = "none"
    }

    let nodo_genre = document.querySelector("#movie-genre");
    let nodo_new_genre = document.createTextNode(`${CONTENT_LIST[ACTUAL_ID].genre}`)
    nodo_genre.appendChild(nodo_new_genre)

    // Para las películas de animación quiero que aparezca "Actores (de voz)" en la página
    if ( CONTENT_LIST[ACTUAL_ID].genre.split(",").shift() == "Animación" ) {
        let nodo_cast_title = document.querySelector("#movie-cast-title")
        let nodo_new_cast_title = document.createTextNode(" (de voz)")
        nodo_cast_title.appendChild(nodo_new_cast_title)
    }

    let nodo_cast = document.querySelector("#movie-cast");
    let cast_list = CONTENT_LIST[ACTUAL_ID].cast

    cast_list.forEach((actor, index) => {
        let nodo_texto = document.createTextNode(`${actor.name}`)

        if ( index != cast_list.length - 1 )
            nodo_texto = document.createTextNode(`${actor.name}, `)

        let nodo_a = document.createElement("a");
        nodo_a.href = PREFIX_WIKIPEDIA + actor.wiki_name
        nodo_a.target = "_blank"

        nodo_a.appendChild(nodo_texto)
        nodo_cast.appendChild(nodo_a)
    });

    nodo_similar_movies_1 = document.querySelector(".similar-movies .similar-movies-1")
    nodo_similar_movies_2 = document.querySelector(".similar-movies .similar-movies-2")

    let similars_array = CONTENT_LIST[ACTUAL_ID].similars

    let nodo_a = document.createElement("a");
    nodo_a.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[0]}`
    nodo_a.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[0])[0].portada_id

    let nodo_a2 = document.createElement("a");
    nodo_a2.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[1]}`
    nodo_a2.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[1])[0].portada_id

    nodo_similar_movies_1.appendChild(nodo_a)
    nodo_similar_movies_1.appendChild(nodo_a2)

    console.log(CONTENT_LIST.filter( x => x.id == similars_array[2])[0])

    let nodo_a3 = document.createElement("a");
    nodo_a3.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[2]}`
    nodo_a3.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[2])[0].portada_id

    let nodo_a4 = document.createElement("a");
    nodo_a4.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[3]}`
    nodo_a4.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[3])[0].portada_id

    nodo_similar_movies_2.appendChild(nodo_a3)
    nodo_similar_movies_2.appendChild(nodo_a4)
}

if ( PAGE_SUFIX == MOVIES_PAGE )
    getMovieDetails();
else if ( PAGE_SUFIX == SERIES_PAGE )
    getSeriesDetails();