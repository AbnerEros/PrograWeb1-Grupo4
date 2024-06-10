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

function getMovieDetail() {
    if ( !ACTUAL_ID )
        return

    let nodo_iframe = document.querySelector(".details-iframe iframe")
    let nodo_video_a = document.querySelector(".details-iframe a")
    nodo_iframe.src = PREFIX_YOUTUBE_IFRAME + CONTENT_LIST[ACTUAL_ID].trailer_id
    nodo_video_a.href = PREFIX_YOUTUBE_VIDEO + CONTENT_LIST[ACTUAL_ID].video_id

    let nodo_title = document.querySelector("#movie-title");
    let nodo_new_title = document.createTextNode(`${CONTENT_LIST[ACTUAL_ID].serie_name}`)
    nodo_title.textContent = ''
    nodo_title.appendChild(nodo_new_title)

    let nodo_duration = document.querySelector("#movie-duration");
    nodo_duration.textContent = ''
    let hours = Math.floor(CONTENT_LIST[ACTUAL_ID].duration / 60)
    let minutes = CONTENT_LIST[ACTUAL_ID].duration % 60
    let nodo_new_duration = document.createTextNode(`${hours}h ${minutes}m`)
    nodo_duration.appendChild(nodo_new_duration)

    if ( CONTENT_LIST[ACTUAL_ID].ext_duration > 0 ) {
        let nodo_ext_duration = document.querySelector("#movie-ext-duration");
        nodo_ext_duration.textContent = ''
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
    nodo_genre.textContent = ''
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
    nodo_cast.textContent = ''

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
    nodo_similar_movies_1.textContent = ''
    nodo_similar_movies_2.textContent = ''

    let similars_array = CONTENT_LIST[ACTUAL_ID].similars

    let nodo_a = document.createElement("a");
    nodo_a.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[0]}`
    nodo_a.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[0])[0].portada_id

    let nodo_a2 = document.createElement("a");
    nodo_a2.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[1]}`
    nodo_a2.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[1])[0].portada_id

    nodo_similar_movies_1.appendChild(nodo_a)
    nodo_similar_movies_1.appendChild(nodo_a2)

    let nodo_a3 = document.createElement("a");
    nodo_a3.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[2]}`
    nodo_a3.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[2])[0].portada_id

    let nodo_a4 = document.createElement("a");
    nodo_a4.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[3]}`
    nodo_a4.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[3])[0].portada_id

    nodo_similar_movies_2.appendChild(nodo_a3)
    nodo_similar_movies_2.appendChild(nodo_a4)
}

function getSerieDetail() {
    let nodo_iframe = document.querySelector(".details-iframe iframe")
    let nodo_video_a = document.querySelector(".details-iframe a")
    nodo_iframe.src = PREFIX_YOUTUBE_IFRAME + CONTENT_LIST[ACTUAL_ID].trailer_id
    nodo_video_a.href = PREFIX_YOUTUBE_VIDEO + CONTENT_LIST[ACTUAL_ID].video_id

    let nodo_title = document.querySelector("#serie-title");
    nodo_title.textContent = ''
    let nodo_new_title = document.createTextNode(`${CONTENT_LIST[ACTUAL_ID].serie_name}`)
    nodo_title.appendChild(nodo_new_title)

    let nodo_season = document.querySelector("#serie-season")
    let nodo_chapter = document.querySelector("#serie-chapter")
    let nodos_season_options = document.querySelectorAll("#serie-season option")
    let nodos_chapter_options = document.querySelectorAll("#serie-chapter option")
    let serie_seasons = CONTENT_LIST[ACTUAL_ID].seasons
    
    nodos_season_options.forEach(option => {
        option.remove()
    });

    nodos_chapter_options.forEach(option => {
        option.remove()
    });

    serie_seasons.forEach(season => {
        let season_el = document.createElement('option')
        season_el.value = season.id
        season_el.innerHTML = `Temporada ${season.id}`
        nodo_season.appendChild(season_el)
    });

    for ( let i = 0 ; i < serie_seasons[0].chapters ; i++ ) {
        let chapter_el = document.createElement('option')
        chapter_el.value = i+1
        chapter_el.innerHTML = `Capítulo ${i+1}`
        nodo_chapter.appendChild(chapter_el)
    }

    nodo_season.addEventListener("change", function() {
        let nodo_seasons = document.getElementById("serie-season")
        let nodo_chapters = document.querySelectorAll("#serie-chapter")
        let nodos_chapters_options = document.querySelectorAll("#serie-chapter option")
        nodos_chapters_options.forEach(option => {
            option.remove()
        });

        for ( let i = 0 ; i < serie_seasons[nodo_seasons.value-1].chapters ; i++ ) {
            let chapter_el = document.createElement('option')
            chapter_el.value = i+1
            chapter_el.innerHTML = `Capítulo ${i+1}`
            nodo_chapter.appendChild(chapter_el)
        }
    })

    let nodo_genre = document.querySelector("#serie-genre");
    nodo_genre.textContent = ''
    let nodo_new_genre = document.createTextNode(`${CONTENT_LIST[ACTUAL_ID].genre}`)
    nodo_genre.appendChild(nodo_new_genre)

    let nodo_cast = document.querySelector("#serie-cast");
    nodo_cast.textContent = ''
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

    nodo_desc = document.querySelector("#series-description")
    nodo_desc.textContent = ''
    let nodo_new_desc = document.createTextNode(CONTENT_LIST[ACTUAL_ID].desc)
    nodo_desc.appendChild(nodo_new_desc)


    nodo_similar_series_1 = document.querySelector(".similar-series .similar-series-1")
    nodo_similar_series_2 = document.querySelector(".similar-series .similar-series-2")
    nodo_similar_series_1.textContent = ''
    nodo_similar_series_2.textContent = ''

    let similars_array = CONTENT_LIST[ACTUAL_ID].similars

    let nodo_a = document.createElement("a");
    nodo_a.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[0]}`
    nodo_a.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[0])[0].portada_id

    let nodo_a2 = document.createElement("a");
    nodo_a2.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[1]}`
    nodo_a2.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[1])[0].portada_id

    nodo_similar_series_1.appendChild(nodo_a)
    nodo_similar_series_1.appendChild(nodo_a2)

    let nodo_a3 = document.createElement("a");
    nodo_a3.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[2]}`
    nodo_a3.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[2])[0].portada_id

    let nodo_a4 = document.createElement("a");
    nodo_a4.href = `?id=${CONTENT_LIST[ACTUAL_ID].similars[3]}`
    nodo_a4.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[3])[0].portada_id

    nodo_similar_series_2.appendChild(nodo_a3)
    nodo_similar_series_2.appendChild(nodo_a4)
}

if ( PAGE_SUFIX == MOVIES_PAGE )
    getMovieDetail();
else if ( PAGE_SUFIX == SERIES_PAGE )
    getSerieDetail();