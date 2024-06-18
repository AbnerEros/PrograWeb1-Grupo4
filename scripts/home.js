const CONTENT_SERIES = JSON.parse(localStorage.getItem("series_list"));
const CONTENT_MOVIES = JSON.parse(localStorage.getItem("movies_list"));
const PREFIX_PATH_IMAGES_MOVIES = "../img/movies/";
const PREFIX_PATH_IMAGES_SERIES = "../img/series/";

function addImages(){
    for(let i in CONTENT_MOVIES) {
        const MOVIES_AND_SERIES_SECTION = document.querySelector(".grid-container");
        const a = document.createElement("a");
        a.href =  CONTENT_MOVIES[i]["html_link"] + CONTENT_MOVIES[i]["id"];
        const img = document.createElement("img");
        img.classList.add("movie-poster");
        img.src = PREFIX_PATH_IMAGES_MOVIES + CONTENT_MOVIES[i]["img_src"];
        img.alt = CONTENT_MOVIES[i]["serie_name"];
        a.appendChild(img);
        MOVIES_AND_SERIES_SECTION.appendChild(a);
    }

    for(let i in CONTENT_SERIES) {
        const MOVIES_AND_SERIES_SECTION = document.querySelector(".grid-container");
        const a = document.createElement("a");
        a.href =CONTENT_SERIES[i]["html_link"] + CONTENT_SERIES[i]["id"];
        const img = document.createElement("img");
        img.classList.add("movie-poster");
        img.src = PREFIX_PATH_IMAGES_SERIES + CONTENT_SERIES[i]["img_src"];
        img.alt = CONTENT_SERIES[i]["serie_name"];
        a.appendChild(img);
        MOVIES_AND_SERIES_SECTION.appendChild(a);
    }
}

addImages();