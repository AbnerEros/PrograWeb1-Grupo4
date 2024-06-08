function databaseMovies() {
    if ( localStorage.getItem("movies_list") )
        return

    const HOBBIT1 = {
        id: 0,
        serie_name: "El Hobbit: un Viaje Inesperado",
        duration: 169,
        ext_duration: 182,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Martin Freeman", wiki_name: "Martin_Freeman"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Richard Armitage", wiki_name: "Richard_Armitage"},
            {name: "Christopher Lee", wiki_name: "Christopher_Lee"},
            {name: "Andy Serkis", wiki_name: "Andy_Serkis"},
            {name: "Cate Blanchett", wiki_name: "Cate_Blanchett"},
            {name: "Ian Holm", wiki_name: "Ian_Holm"},
            {name: "James Nesbitt", wiki_name: "James_Nesbitt"}
        ],
        trailer_id: "mIeR92fwNtw?si=NHEmhveV89v2YnYo",
        video_id: "TeSzBaedb2Y",
        similars: [1, 2, 5, 6],
        portada_id: "hobbit1"
    }
    const HOBBIT2 = {
        id: 1,
        serie_name: "El Hobbit: la Desolación de Smaug",
        duration: 161,
        ext_duration: 186,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Martin Freeman", wiki_name: "Martin_Freeman"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Richard Armitage", wiki_name: "Richard_Armitage"},
            {name: "Benedict Cumberbatch", wiki_name: "Benedict_Cumberbatch"},
            {name: "Evangeline Lilly", wiki_name: "Evangeline_Lilly"},
            {name: "Lee Pace", wiki_name: "Lee_Pace"},
            {name: "Luke Evans", wiki_name: "Luke_Evans"},
            {name: "Stephen Fry", wiki_name: "Stephen_Fry"}
        ],
        trailer_id: "lSv53ZBFpc8?si=KxJutzTMnBWzNVIg",
        video_id: "sXN9IHrnVVU",
        similars: [0, 2, 5, 6],
        portada_id: "hobbit2"
    }
    const HOBBIT3 = {
        id: 2,
        serie_name: "El Hobbit: la Batalla de los Cinco Ejércitos",
        duration: 144,
        ext_duration: 164,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Martin Freeman", wiki_name: "Martin_Freeman"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Richard Armitage", wiki_name: "Richard_Armitage"},
            {name: "Benedict Cumberbatch", wiki_name: "Benedict_Cumberbatch"},
            {name: "Evangeline Lilly", wiki_name: "Evangeline_Lilly"},
            {name: "Lee Pace", wiki_name: "Lee_Pace"},
            {name: "Luke Evans", wiki_name: "Luke_Evans"},
            {name: "Stephen Fry", wiki_name: "Stephen_Fry"}
        ],
        trailer_id: "oSTb50mGJe0?si=eDlrY93usAm_75h-",
        video_id: "WYi4Bp1hmC0",
        similars: [0, 1, 5, 6],
        portada_id: "hobbit3"
    }
    const KUNG_FU_PANDA = {
        id: 3,
        serie_name: "Kung Fu Panda 4",
        duration: 94,
        ext_duration: 0,
        genre: "Animación, Aventura, Comedia, Infantil, Wuxia",
        cast: [
            {name: "Jack Black", wiki_name: "Jack_Black"},
            {name: "Awkwafina", wiki_name: "Awkwafina"},
            {name: "Viola Davis", wiki_name: "Viola_Davis"},
            {name: "Dustin Hoffman", wiki_name: "Dustin_Hoffman"},
            {name: "James Hong", wiki_name: "James_Hong"},
            {name: "Bryan Cranston", wiki_name: "Bryan_Cranston"},
            {name: "Ian McShane", wiki_name: "Ian_McShane"},
            {name: "Ke Huy Quan", wiki_name: "Ke_Huy_Quan"},
            {name: "Angelina Jolie", wiki_name: "Angelina_Jolie"}
        ],
        trailer_id: "kg3Q63gzF6I?si=c1Drc9QRRWZFHZJu",
        video_id: "aw1x1EfgJ6E",
        similars: [4, 8, 9, 10],
        portada_id: "kung-fu-panda"
    }
    const ERA_DEL_HIELO = {
        id: 4,
        serie_name: "La Era del Hielo",
        duration: 81,
        ext_duration: 0,
        genre: "Animación, Comedia, Aventura, Infantil",
        cast: [
            {name: "Ray Romano", wiki_name: "Ray_Romano"},
            {name: "John Leguizamo", wiki_name: "John_Leguizamo"},
            {name: "Denis Leary", wiki_name: "Denis_Leary"},
            {name: "Goran Višnjić", wiki_name: "Goran_Višnjić"},
            {name: "Stephen Root", wiki_name: "Stephen_Root"},
            {name: "Jack Black", wiki_name: "Jack_Black"}
        ],
        trailer_id: "RI7e1IksKEQ?si=UHdZgOICH4D-Ei0i",
        video_id: "vYX1Tc1sdz4",
        similars: [3, 9, 10, 11],
        portada_id: "la-era-del-hielo"
    }
    const LOTR1 = {
        id: 5,
        serie_name: "El Señor de los Anillos: la Comunidad del Anillo",
        duration: 178,
        ext_duration: 238,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Elijah Wood", wiki_name: "Elijah_Wood"},
            {name: "Sean Astin", wiki_name: "Sean_Astin"},
            {name: "Billy Boyd", wiki_name: "Billy_Boyd"},
            {name: "Dominic Monaghan", wiki_name: "Dominic_Monaghan"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Viggo Mortensen", wiki_name: "Viggo_Mortensen"},
            {name: "Orlando Bloom", wiki_name: "Orlando_Bloom"},
            {name: "John Rhys-Davies", wiki_name: "John_Rhys-Davies"},
            {name: "Sean Bean", wiki_name: "Sean_Bean"}
        ],
        trailer_id: "iFOucwxKRFE?si=NCS1Bics2EZXzMhs",
        video_id: "1BGaWPDBBHc",
        similars: [6, 7, 0, 1],
        portada_id: "lotr1"
    }
    const LOTR2 = {
        id: 6,
        serie_name: "El Señor de los Anillos: Las dos Torres",
        duration: 179,
        ext_duration: 235,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Elijah Wood", wiki_name: "Elijah_Wood"},
            {name: "Sean Astin", wiki_name: "Sean_Astin"},
            {name: "Billy Boyd", wiki_name: "Billy_Boyd"},
            {name: "Dominic Monaghan", wiki_name: "Dominic_Monaghan"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Viggo Mortensen", wiki_name: "Viggo_Mortensen"},
            {name: "Orlando Bloom", wiki_name: "Orlando_Bloom"},
            {name: "John Rhys-Davies", wiki_name: "John_Rhys-Davies"},
            {name: "Christopher Lee", wiki_name: "Christopher_Lee"}
        ],
        trailer_id: "GPAOgWeAU-E?si=Xv7ftue1dcNBviYb",
        video_id: "Z9TbbMEJb2c",
        similars: [5, 7, 0, 1],
        portada_id: "lotr2"
    }
    const LOTR3 = {
        id: 7,
        serie_name: "El Señor de los Anillos: El Retorno del Rey",
        duration: 201,
        ext_duration: 263,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Elijah Wood", wiki_name: "Elijah_Wood"},
            {name: "Sean Astin", wiki_name: "Sean_Astin"},
            {name: "Billy Boyd", wiki_name: "Billy_Boyd"},
            {name: "Dominic Monaghan", wiki_name: "Dominic_Monaghan"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Viggo Mortensen", wiki_name: "Viggo_Mortensen"},
            {name: "Orlando Bloom", wiki_name: "Orlando_Bloom"},
            {name: "John Rhys-Davies", wiki_name: "John_Rhys-Davies"},
            {name: "John Noble", wiki_name: "John_Noble"}
        ],
        trailer_id: "5GjUcOGPHtM?si=75a5sHPfzNGilmrE",
        video_id: "TPBq1khnb-w",
        similars: [5, 6, 0, 1],
        portada_id: "lotr3"
    }
    const MADAGASCAR = {
        id: 8,
        serie_name: "Madagascar",
        duration: 86,
        ext_duration: 0,
        genre: "Animación, Aventura, Comedia, Infantil, Sátira",
        cast: [
            {name: "Ben Stiller", wiki_name: "Ben_Stiller"},
            {name: "Chris Rock", wiki_name: "Chris_Rock"},
            {name: "Jada Pinkett Smith", wiki_name: "Jada_Pinkett_Smith"},
            {name: "David Schwimmer", wiki_name: "David_Schwimmer"},
            {name: "Sacha Baron Cohen", wiki_name: "Sacha_Baron_Cohen"},
            {name: "Cedric the Entertainer", wiki_name: "Cedric_the_Entertainer"}
        ],
        trailer_id: "3X3NkVbcw58?si=NNbtjK85AHlC9uIX",
        video_id: "YqcXX92WGY8",
        similars: [3, 4, 10, 11],
        portada_id: "madagascar"
    }
    const RATATOUILLE = {
        id: 9,
        serie_name: "El Hobbit: la Batalla de los Cinco Ejércitos",
        duration: 144,
        ext_duration: 164,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Martin Freeman", wiki_name: "Martin_Freeman"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Richard Armitage", wiki_name: "Richard_Armitage"},
            {name: "Benedict Cumberbatch", wiki_name: "Benedict_Cumberbatch"},
            {name: "Evangeline Lilly", wiki_name: "Evangeline_Lilly"},
            {name: "Lee Pace", wiki_name: "Lee_Pace"},
            {name: "Luke Evans", wiki_name: "Luke_Evans"},
            {name: "Stephen Fry", wiki_name: "Stephen_Fry"}
        ],
        trailer_id: "oSTb50mGJe0?si=eDlrY93usAm_75h-",
        video_id: "WYi4Bp1hmC0",
        similars: [3, 9, 10, 11],
        portada_id: "la-era-del-hielo"
    }
    const SHREK = {
        id: 10,
        serie_name: "El Hobbit: la Batalla de los Cinco Ejércitos",
        duration: 144,
        ext_duration: 164,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Martin Freeman", wiki_name: "Martin_Freeman"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Richard Armitage", wiki_name: "Richard_Armitage"},
            {name: "Benedict Cumberbatch", wiki_name: "Benedict_Cumberbatch"},
            {name: "Evangeline Lilly", wiki_name: "Evangeline_Lilly"},
            {name: "Lee Pace", wiki_name: "Lee_Pace"},
            {name: "Luke Evans", wiki_name: "Luke_Evans"},
            {name: "Stephen Fry", wiki_name: "Stephen_Fry"}
        ],
        trailer_id: "oSTb50mGJe0?si=eDlrY93usAm_75h-",
        video_id: "WYi4Bp1hmC0",
        similars: [3, 9, 10, 11],
        portada_id: "la-era-del-hielo"
    }
    const TOY_STORY = {
        id: 11,
        serie_name: "El Hobbit: la Batalla de los Cinco Ejércitos",
        duration: 144,
        ext_duration: 164,
        genre: "Acción, Aventura, Fantasía, Fantasía Épica",
        cast: [
            {name: "Martin Freeman", wiki_name: "Martin_Freeman"},
            {name: "Ian McKellen", wiki_name: "Ian_McKellen"},
            {name: "Richard Armitage", wiki_name: "Richard_Armitage"},
            {name: "Benedict Cumberbatch", wiki_name: "Benedict_Cumberbatch"},
            {name: "Evangeline Lilly", wiki_name: "Evangeline_Lilly"},
            {name: "Lee Pace", wiki_name: "Lee_Pace"},
            {name: "Luke Evans", wiki_name: "Luke_Evans"},
            {name: "Stephen Fry", wiki_name: "Stephen_Fry"}
        ],
        trailer_id: "oSTb50mGJe0?si=eDlrY93usAm_75h-",
        video_id: "WYi4Bp1hmC0",
        similars: [3, 9, 10, 11],
        portada_id: "la-era-del-hielo"
    }

    const MOVIES = [HOBBIT1, HOBBIT2, HOBBIT3, KUNG_FU_PANDA, ERA_DEL_HIELO, LOTR1, LOTR2, LOTR3, MADAGASCAR, RATATOUILLE, SHREK, TOY_STORY]
    localStorage.setItem("movies_list", JSON.stringify(MOVIES))
}

databaseMovies()