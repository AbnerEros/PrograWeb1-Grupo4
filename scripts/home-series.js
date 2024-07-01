if ( !localStorage.getItem('username') )
    window.location.href = "../index.html";

const CONTENT_SERIES = JSON.parse(localStorage.getItem("series_list"));
const CONTENT_MOVIES = JSON.parse(localStorage.getItem("movies_list"));
const PREFIX_PATH_IMAGES_MOVIES = "../img/movies/";
const PREFIX_PATH_IMAGES_SERIES = "../img/series/";

const SELECT_CATEGORY = document.querySelector(".categories select.category-select")
const MOVIES_AND_SERIES_SECTION = document.querySelector(".grid-container");

const SELECT_CATEGORY_OPTIONS = document.querySelectorAll(".categories select.category-select option")
const SELECT_CATEGORY_OPTION_TODAS = document.querySelectorAll('.categories select.category-select option[value="todas"]')
const SEARCH_INPUT = document.querySelector(".search-bar #search-input")


function addSeries(){
    for(let i in CONTENT_SERIES){
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
    
function updateActiveCategory(category) {
    SEARCH_INPUT.value = ''
    const MOVIES_AND_SERIES_SECTION_CHILDS = document.querySelectorAll('.grid-container a');
    MOVIES_AND_SERIES_SECTION_CHILDS.forEach(element => {
        element.remove()
    })

    if ( category == 'todas' )
        addSeries();
    else
        for(let i in CONTENT_SERIES) {
            if ( !CONTENT_SERIES[i].genre.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(category) )
                continue;

            const a = document.createElement("a");
            const img = document.createElement("img");
            a.href =CONTENT_SERIES[i]["html_link"] + CONTENT_SERIES[i]["id"];
            img.classList.add("movie-poster");
            img.src = PREFIX_PATH_IMAGES_SERIES + CONTENT_SERIES[i]["img_src"];
            img.alt = CONTENT_SERIES[i]["serie_name"];
            a.appendChild(img);
            MOVIES_AND_SERIES_SECTION.appendChild(a);
        }
}


function updateSearch(search) {
    const MOVIES_AND_SERIES_SECTION_CHILDS = document.querySelectorAll('.grid-container a');
    MOVIES_AND_SERIES_SECTION_CHILDS.forEach(element => {
        element.remove()
    })
    
    if ( search == '' ) {
        let h1_search = document.querySelector("#not-found-search")
        h1_search.style.display = 'none'
        addSeries();
    } else {
        for(let i in CONTENT_SERIES) {
            if ( !CONTENT_SERIES[i].serie_name.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()) )
                continue;

            const a = document.createElement("a");
            const img = document.createElement("img");
            a.href = CONTENT_SERIES[i]["html_link"] + CONTENT_SERIES[i]["id"];
            img.classList.add("movie-poster");
            img.src = PREFIX_PATH_IMAGES_SERIES + CONTENT_SERIES[i]["img_src"];
            img.alt = CONTENT_SERIES[i]["serie_name"];
            a.appendChild(img);
            MOVIES_AND_SERIES_SECTION.appendChild(a);
            let h1_search = document.querySelector("#not-found-search")
            if ( h1_search )
                h1_search.style.display = 'none'
        }

        let h1_search = document.querySelector("#not-found-search")
        if ( !MOVIES_AND_SERIES_SECTION.childElementCount == 0 )
            return

        if ( h1_search ) {
            h1_search.style.display = 'block'
            h1_search.textContent = `No tenemos «${search}», pero podría interesarte:`
            addSeries()
        } else {
                const h1 = document.createElement("h1");
                h1.textContent = `No tenemos «${search}», pero podría interesarte:`
                h1.style.fontFamily = 'Roboto, sans-serif'
                h1.style.color = '#343440'
                h1.id = 'not-found-search'
                h1.style.textOverflow = 'ellipsis'
                h1.style.whiteSpace = 'nowrap'
                h1.style.overflow = 'hidden'
                h1.style.marginTop = 0
                h1.style.fontSize = '1.5rem'
                h1.style.fontWeight = 400
                h1.style.marginBottom = 0
                MOVIES_AND_SERIES_SECTION.insertAdjacentElement("beforebegin", h1)
                addSeries()
            }
    }
}

addSeries();
SELECT_CATEGORY.addEventListener("change", function() {
    updateActiveCategory(SELECT_CATEGORY.value)
})

SEARCH_INPUT.addEventListener("input", function() {
    SELECT_CATEGORY_OPTIONS.forEach(option => {
        option.selected = false
    });
    SELECT_CATEGORY_OPTION_TODAS.selected = true
        
    if ( SEARCH_INPUT.value.length > 50 )
        SEARCH_INPUT.value = SEARCH_INPUT.value.substring(0, 50)

    updateSearch(SEARCH_INPUT.value)
})