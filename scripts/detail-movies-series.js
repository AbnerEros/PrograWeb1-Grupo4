const PREFIX_WIKIPEDIA = "https://es.wikipedia.org/wiki/"
const PREFIX_YOUTUBE_IFRAME = "https://www.youtube.com/embed/"
const PREFIX_YOUTUBE_VIDEO = "https://www.youtube.com/watch?v="

const PAGE = window.location.pathname.split("/").pop();
const PAGE_SUFIX = PAGE.split("-").pop().split(".").shift();
const MOVIES_PAGE = "movies"
const SERIES_PAGE = "series"
const STORAGE_MOVIES = "movies_list"
const STORAGE_SERIES = "series_list"
let actual_id = 0
const SIMILARS_CAROUSEL = document.querySelector('#similars-carousel');
const SIMILARS_CAROUSEL_ID = '#similars-carousel';

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

function setIframeAndVideo(serie_id, parent_class) {
    let nodo_iframe = document.querySelector(`${parent_class} iframe`)
    let nodo_video_a = document.querySelector(`${parent_class} a`)
    nodo_iframe.src = PREFIX_YOUTUBE_IFRAME + CONTENT_LIST[serie_id].trailer_id
    nodo_video_a.href = PREFIX_YOUTUBE_VIDEO + CONTENT_LIST[serie_id].video_id
}

function setTitle(serie_id, title_id) {
    let nodo_title = document.querySelector(title_id);
    nodo_title.textContent = CONTENT_LIST[serie_id].serie_name
}

function setDurationAndExtDuration(serie_id, duration_id, ext_duration_id) {
    let nodo_duration = document.querySelector(duration_id);
    nodo_duration.textContent = ''
    let hours = Math.floor(CONTENT_LIST[serie_id].duration / 60)
    let minutes = CONTENT_LIST[serie_id].duration % 60
    let nodo_new_duration = document.createTextNode(`${hours}h ${minutes}m`)
    nodo_duration.appendChild(nodo_new_duration)

    if ( CONTENT_LIST[serie_id].ext_duration > 0 ) {
        let nodo_ext_duration = document.querySelector(ext_duration_id);
        nodo_ext_duration.textContent = ''
        let ext_hours = Math.floor(CONTENT_LIST[serie_id].ext_duration / 60)
        let ext_minutes = CONTENT_LIST[serie_id].ext_duration % 60
        let nodo_new_ext_duration = document.createTextNode(`${ext_hours}h ${ext_minutes}m`)
        nodo_ext_duration.appendChild(nodo_new_ext_duration)
    } else {
        // Para las películas que no tengan versión extendida, no quiero mostrar esa sección
        let nodo_ext_duration_container = document.querySelector(ext_duration_id + "-container")
        nodo_ext_duration_container.style.display = "none"
    }
}

function setGenre(serie_id, genre_id) {
    let nodo_genre = document.querySelector(genre_id);
    nodo_genre.textContent = CONTENT_LIST[serie_id].genre
}

function setCast(serie_id, cast_id) {
    let all_cast = document.querySelectorAll(cast_id + " a")
    all_cast.forEach((node) => {
        node.remove()
    });
    
    // Para las películas de animación quiero que aparezca "Actores (de voz)" en la página
    if ( document.querySelector(cast_id + "-title") && CONTENT_LIST[serie_id].genre.split(",").shift() == "Animación" && !document.querySelector(cast_id + "-title").textContent.includes("(de voz)") ) {
        let nodo_cast_title = document.querySelector(cast_id + "-title")
        nodo_cast_title.textContent += " (de voz)"
    }
    
    if ( document.querySelector(cast_id + "-title") && CONTENT_LIST[serie_id].genre.split(",").shift() != "Animación" && document.querySelector(cast_id + "-title").textContent.includes("(de voz)") ) {
        let nodo_cast_title = document.querySelector(cast_id + "-title")
        nodo_cast_title.textContent = "Actores"
    }

    let nodo_cast = document.querySelector(cast_id);
    let cast_list = CONTENT_LIST[serie_id].cast

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

function setSimilars(serie_id, similars_id) {
    let final_similars_id = similars_id 
    let similars_array = CONTENT_LIST[serie_id].similars

    nodo_similars_a = document.querySelectorAll(similars_id + ' a')
    nodo_similars_a.forEach((node) => {
        node.remove()
    });

    if ( document.querySelector(`${similars_id} .flickity-slider`) )
        final_similars_id = `${similars_id} .flickity-slider`

    for (let i = 0; i < similars_array.length; i++) {
        let nodo_a = document.createElement("a");
        nodo_a.classList.add("carousel-cell")
        nodo_a.classList.add("carousel-id-" + i)
        nodo_a.style.cursor = 'pointer'
        nodo_a.style.position = 'absolute'
        nodo_a.style.left = '0px'
        nodo_a.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[i])[0].portada_id
        document.querySelector(final_similars_id).appendChild(nodo_a)
    }

    for (let i = 0; i < similars_array.length; i++) {
        let nodo_a = document.createElement("a");
        nodo_a.classList.add("carousel-cell");
        nodo_a.classList.add("carousel-id-"+ (i + similars_array.length) )
        nodo_a.style.cursor = 'pointer'
        nodo_a.style.position = 'absolute'
        nodo_a.style.left = '0px'
        nodo_a.id = `portada-` + CONTENT_LIST.filter( x => x.id == similars_array[i])[0].portada_id;
        document.querySelector(final_similars_id).appendChild(nodo_a);
    }
}

function setSeasonAndChapter(serie_id, season_id, chapter_id) {
    let nodo_season = document.querySelector(season_id)
    let nodo_chapter = document.querySelector(chapter_id)
    let serie_seasons = CONTENT_LIST[serie_id].seasons
    let all_seasons = document.querySelectorAll(season_id + " option")
    let all_chapters = document.querySelectorAll(chapter_id + " option")

    nodo_season.addEventListener("change", function() {
        serie_seasons = CONTENT_LIST[serie_id].seasons
        all_chapters = document.querySelectorAll(chapter_id + " option")
        all_chapters.forEach(option => {
            option.remove()
        });

        let nodo_seasons = document.querySelector(season_id)
        if ( !serie_seasons[nodo_seasons.value-1] )
            return

        for ( let i = 0 ; i < serie_seasons[nodo_seasons.value-1].chapters ; i++ ) {
            let chapter_el = document.createElement('option')
            chapter_el.value = i+1
            chapter_el.innerHTML = `Capítulo ${i+1}`
            nodo_chapter.appendChild(chapter_el)
        }
    })
    
    all_seasons.forEach(option => {
        option.remove()
    });
    all_chapters.forEach(option => {
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
}

function setDescription(serie_id, description_id) {
    nodo_desc = document.querySelector(description_id)
    nodo_desc.textContent = CONTENT_LIST[serie_id].desc
}

function setMovieDetail(movie_id) {
    setDocumentTitle(movie_id)
    setIframeAndVideo(movie_id, "#details-iframe");
    setTitle(movie_id, "#movie-title");
    setDurationAndExtDuration(movie_id, "#movie-duration", "#movie-ext-duration");
    setGenre(movie_id, "#movie-genre");
    setCast(movie_id, "#movie-cast")
}

function setDocumentTitle(serie_id) {
    document.title = CONTENT_LIST[serie_id].serie_name
}

function setCarouselEventListener(flickity_carousel) {
    let SIMILARS_CAROUSEL_SLIDERS = document.querySelectorAll('a.carousel-cell');
    SIMILARS_CAROUSEL_SLIDERS.forEach(slider => {
        slider.addEventListener("click", function() {
            flickity_carousel.select(slider.classList[1].split('-').pop());
        })
    });
}

function setSerieDetail(serie_id) {
    setDocumentTitle(serie_id)
    setIframeAndVideo(serie_id, "#details-iframe");
    setTitle(serie_id, "#serie-title");
    setSeasonAndChapter(serie_id, "#serie-season", "#serie-chapter")
    setGenre(serie_id, "#serie-genre");
    setCast(serie_id, "#serie-cast")
    setDescription(serie_id, "#series-description")
}

if ( PARAM_ID )
    actual_id = PARAM_ID

if ( PAGE_SUFIX == MOVIES_PAGE ) {
    setMovieDetail(actual_id);
    setSimilars(actual_id, SIMILARS_CAROUSEL_ID);
    const flickity_carousel_movies = new Flickity( SIMILARS_CAROUSEL, {
        cellAlign: 'center',
        wrapAround: true,
        freeScroll: true,
        pageDots: true,
        accessibility: true,
        imagedLoaded: true,
        on: {
            change: function( index ) {
                setMovieDetail( index % CONTENT_LIST.length );
            }
        }
    });
    setCarouselEventListener(flickity_carousel_movies);
    flickity_carousel_movies.select(actual_id);
} else if ( PAGE_SUFIX == SERIES_PAGE ) {
    setSerieDetail(actual_id);
    setSimilars(actual_id, SIMILARS_CAROUSEL_ID);
    const flickity_carousel_series = new Flickity( SIMILARS_CAROUSEL, {
        cellAlign: 'center',
        wrapAround: true,
        freeScroll: true,
        pageDots: true,
        accessibility: true,
        imagedLoaded: true,
        on: {
            change: function( index ) {
                setSerieDetail( index % CONTENT_LIST.length );
            }
        }
    });
    setCarouselEventListener(flickity_carousel_series);
    flickity_carousel_series.select(actual_id);
}