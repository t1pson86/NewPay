
let header = document.querySelector('header')
if (header) {

    function exit() {
        localStorage.removeItem("auth")
        redirect('index')
    }

    let auth_state = localStorage.getItem('auth')

    header.innerHTML =
        `
    <nav class="nav-header">
        <div class="container">
            <a href="${HOME_URL}/newPay.html" class="navbar-header">New Pay</a>
            <ul class="navbar-menu">
                <li><a href="${HOME_URL + (auth_state ? "/sell.html" : "/index.html")}">To sell</a></li>
                <li><a href="${HOME_URL}/profile.html">Profile</a></li>
                <li><a href="${HOME_URL}/support.html">Support</a></li>
            </ul>
            <div class="btn-header">
            ${auth_state ? "<button onclick='exit()' id='exit'>Exit</button>" : "<a href='" + HOME_URL + "/index.html" + "'>Login</a > "}
            </div >
        </div >
    </nav >
        `
}

