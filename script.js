const HEADER_CLOSE_SESSION = document.querySelectorAll("#header-close-session")

HEADER_CLOSE_SESSION.forEach(btn => {
    if ( btn ) {
        btn.addEventListener("click", function() {
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
});