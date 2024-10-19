guard("user")

function get_products() {
    $.ajax({
        url: `${API_URL}/products/all`, //куда
        method: "get", // как
        dataType: "json", //тип посылки
        data: {}, // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            print_products(data.games)
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
        }
    })
}

get_products()


function print_products(games) {
    let block = document.querySelector("#block__games")
    if (block) {
        if (games) {
            games.forEach(game => {
                block.innerHTML +=
                    `
                <option value="${game.id}">${game.name}</option>
                `
            });
        }
    }
}


add_form.onsubmit = function (event) {
    event.preventDefault()

    let validate_data = [
        document.querySelector('#name_inp'),
        document.querySelector('#price_inp'),
    ]

    let is_error = validate_length(validate_data)
    if (is_error.length) return

    trim_form('add_form')

    new_form = new FormData(add_form)
    let token = is_auth()
    new_form.set('token', token)
    $.ajax({
        url: `${API_URL}/tovars`,
        dataType: "json",
        method: "post",
        processData: false,
        contentType: false,
        data: new_form,
        success: function (data) {
            alert(data)
            add_form.reset()
            redirect('profile')
        },
        error: function (err) {
            alert(err.responseJSON)
        }
    })
}