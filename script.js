const HEADER_CLOSE_SESSION = document.getElementById("header-close-session")

if ( HEADER_CLOSE_SESSION ) {
    HEADER_CLOSE_SESSION.addEventListener("click", function() {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("pay_method");
        localStorage.removeItem("pay_method_card");
        localStorage.removeItem("pay_method_card_name");
        localStorage.removeItem("pay_method_card_venc");
        localStorage.removeItem("pay_method_cvv");
        window.location.replace("../index.html")
    }, false)
}