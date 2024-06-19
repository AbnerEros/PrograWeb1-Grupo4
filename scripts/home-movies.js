const CONTENT_SERIES = JSON.parse(localStorage.getItem("series_list"));
const CONTENT_MOVIES = JSON.parse(localStorage.getItem("movies_list"));
const PREFIX_PATH_IMAGES_MOVIES = "../img/movies/";
const PREFIX_PATH_IMAGES_SERIES = "../img/series/";
const SELECT_CATEGORY = document.querySelector(".categories select.category-select")
const MOVIES_AND_SERIES_SECTION = document.querySelector(".grid-container");

function addMovies(){
    for(let i in CONTENT_MOVIES){
        const a = document.createElement("a");
        a.href =  CONTENT_MOVIES[i]["html_link"] + CONTENT_MOVIES[i]["id"];
        const img = document.createElement("img");
        img.classList.add("movie-poster");
        img.src = PREFIX_PATH_IMAGES_MOVIES + CONTENT_MOVIES[i]["img_src"];
        img.alt = CONTENT_MOVIES[i]["serie_name"];
        a.appendChild(img);
        MOVIES_AND_SERIES_SECTION.appendChild(a);
        console.log(a.href);
    }
}

function updateMoviesAndSeries(category) {
    const MOVIES_AND_SERIES_SECTION_CHILDS = document.querySelectorAll('.grid-container a');
    MOVIES_AND_SERIES_SECTION_CHILDS.forEach(element => {
        element.remove()
    })
    
    for(let i in CONTENT_MOVIES) {
        if ( !CONTENT_MOVIES[i].genre.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(category) )
            continue;

        const a = document.createElement("a");
        const img = document.createElement("img");
        a.href =  CONTENT_MOVIES[i]["html_link"] + CONTENT_MOVIES[i]["id"];
        img.classList.add("movie-poster");
        img.src = PREFIX_PATH_IMAGES_MOVIES + CONTENT_MOVIES[i]["img_src"];
        img.alt = CONTENT_MOVIES[i]["serie_name"];
        a.appendChild(img);
        MOVIES_AND_SERIES_SECTION.appendChild(a);
    }
}

addMovies();

SELECT_CATEGORY.addEventListener("change", function() {
    updateMoviesAndSeries(SELECT_CATEGORY.value)
})