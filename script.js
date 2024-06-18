const HEADER_CLOSE_SESSION = document.getElementById("header-close-session")

if ( HEADER_CLOSE_SESSION ) {
    HEADER_CLOSE_SESSION.addEventListener("click", function() {
        localStorage.clear();
        window.location.replace("../index.html")
    }, false)
}