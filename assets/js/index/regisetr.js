

registr_form.onsubmit = function (event) {
    event.preventDefault()
    let data = {
        'login': email_field.value,
        'password': password_field.value,
        'name': name_field.value
    }
    error_text.innerText = ''
    $.ajax({
        url: `${API_URL}/register`, //куда
        method: "post", // как
        dataType: "json", //тип посылки
        headers: {
            'Content-Type': "application/json"
        },
        data: JSON.stringify(data), // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            location.href = `${HOME_URL}/index.html`
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
            if (error.responseJSON.message) {e
            }
                error_text.innerText = error.responseJSON.messag
        }
    })
}
