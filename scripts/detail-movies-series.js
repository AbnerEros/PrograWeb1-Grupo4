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
const PARAM_ID = URL_GEN.searchParams.get("id")

function setIframeAndVideo(actual_id, parent_class) {
    let nodo_iframe = document.querySelector(`${parent_class} iframe`)
    let nodo_video_a = document.querySelector(`${parent_class} a`)
    nodo_iframe.src = PREFIX_YOUTUBE_IFRAME + CONTENT_LIST[actual_id].trailer_id
    nodo_video_a.href = PREFIX_YOUTUBE_VIDEO + CONTENT_LIST[actual_id].video_id
}

function setTitle(actual_id, title_id) {
    let nodo_title = document.querySelector(title_id);
    nodo_title.textContent = CONTENT_LIST[actual_id].serie_name
}

function setDurationAndExtDuration(actual_id, duration_id, ext_duration_id) {
    let nodo_duration = document.querySelector(duration_id);
    nodo_duration.textContent = ''
    let hours = Math.floor(CONTENT_LIST[actual_id].duration / 60)
    let minutes = CONTENT_LIST[actual_id].duration % 60
    let nodo_new_duration = document.createTextNode(`${hours}h ${minutes}m`)
    nodo_duration.appendChild(nodo_new_duration)

    if ( CONTENT_LIST[actual_id].ext_duration > 0 ) {
        let nodo_ext_duration = document.querySelector(ext_duration_id);
        nodo_ext_duration.textContent = ''
        let ext_hours = Math.floor(CONTENT_LIST[actual_id].ext_duration / 60)
        let ext_minutes = CONTENT_LIST[actual_id].ext_duration % 60
        let nodo_new_ext_duration = document.createTextNode(`${ext_hours}h ${ext_minutes}m`)
        nodo_ext_duration.appendChild(nodo_new_ext_duration)
    } else {
        // Para las películas que no tengan versión extendida, no quiero mostrar esa sección
        let nodo_ext_duration_container = document.querySelector(ext_duration_id + "-container")
        nodo_ext_duration_container.style.display = "none"
    }
}

function setGenre(actual_id, genre_id) {
    let nodo_genre = document.querySelector(genre_id);
    nodo_genre.textContent = CONTENT_LIST[actual_id].genre
}

function setCast(actual_id, cast_id) {
    // Para las películas de animación quiero que aparezca "Actores (de voz)" en la página
    if ( CONTENT_LIST[actual_id].genre.split(",").shift() == "Animación" ) {
        let nodo_cast_title = document.querySelector(cast_id + "-title")
        nodo_cast_title.textContent += " (de voz)"
    }

    let nodo_cast = document.querySelector(cast_id);
    let cast_list = CONTENT_LIST[actual_id].cast

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
}

function setSimilars(actual_id, similar_class) {
    nodo_similar_movies_1 = document.querySelector(`${similar_class} ${similar_class}-1`)
    nodo_similar_movies_2 = document.querySelector(`${similar_class} ${similar_class}-2`)

    let similars_array = CONTENT_LIST[actual_id].similars

    for (let i = 0; i < similars_array.length; i++) {
        let nodo_a = document.createElement("a");
        nodo_a.href = `?id=${CONTENT_LIST[actual_id].similars[i]}`
        nodo_a.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[i])[0].portada_id
        if ( i < 2 )
            document.querySelector(`${similar_class} ${similar_class}-1`).appendChild(nodo_a)
        else
            document.querySelector(`${similar_class} ${similar_class}-2`).appendChild(nodo_a)
    }
}

function setSeasonAndChapter(actual_id, season_id, chapter_id) {
    let nodo_season = document.querySelector(season_id)
    let nodo_chapter = document.querySelector(chapter_id)
    let serie_seasons = CONTENT_LIST[actual_id].seasons

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
        let nodo_seasons = document.querySelector(season_id)
        for ( let i = 0 ; i < serie_seasons[nodo_seasons.value-1].chapters ; i++ ) {
            let chapter_el = document.createElement('option')
            chapter_el.value = i+1
            chapter_el.innerHTML = `Capítulo ${i+1}`
            nodo_chapter.appendChild(chapter_el)
        }
    })
}

function setDescription(actual_id, description_id) {
    nodo_desc = document.querySelector(description_id)
    nodo_desc.textContent = CONTENT_LIST[actual_id].desc
}

function getMovieDetail() {
    let actual_id;
    if ( !PARAM_ID ) {
        actual_id = 0
    } else {
        actual_id = PARAM_ID
    }

    setIframeAndVideo(actual_id, "#details-iframe");
    setTitle(actual_id, "#movie-title");
    setDurationAndExtDuration(actual_id, "#movie-duration", "#movie-ext-duration");
    setGenre(actual_id, "#movie-genre");
    setCast(actual_id, "#movie-cast")
    setSimilars(actual_id, ".similar-movies")
}

function getSerieDetail() {
    let actual_id;
    if ( !PARAM_ID ) {
        actual_id = 0
    } else {
        actual_id = PARAM_ID
    }

    setIframeAndVideo(actual_id, "#details-iframe");
    setTitle(actual_id, "#serie-title");
    setSeasonAndChapter(actual_id, "#serie-season", "#serie-chapter")
    setGenre(actual_id, "#serie-genre");
    setCast(actual_id, "#serie-cast")
    setDescription(actual_id, "#series-description")
    setSimilars(actual_id, ".similar-series")
}

if ( PAGE_SUFIX == MOVIES_PAGE )
    getMovieDetail();
else if ( PAGE_SUFIX == SERIES_PAGE )
    getSerieDetail();