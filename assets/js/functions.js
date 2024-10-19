function guard(visit) {
    let auth_state = is_auth()
    if (visit == 'user' && !auth_state) {
        redirect("index")
    }
    else if (visit == 'guest' && auth_state) {
        redirect('profile')
    }
}


function redirect(page) {
    location.href = `${HOME_URL}/${page}.html`
}

function is_auth() {
    return localStorage.getItem("auth")
}



function validate_length(data) {
    let error = []
    data.forEach(inp => {
        let value = String(inp.value).trim()
        if (value.length == 0) {
            error.push(inp)
        }
    });
    if (error.length) {
        error.map(inp => inp.style.border = "1px solid red")
    }
    return error
}


function trim_form(form) {
    let form_block = document.querySelector(`#${form}`)
    if (form_block) {
        let inpts = form_block.querySelectorAll('input')
        inpts.forEach(inp => {
            if (inp.type == 'file') return
            inp.value = String(inp.value).trim()
        });
    }
}









