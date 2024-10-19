guard("guest")


login_form.onsubmit = function (event) {
    event.preventDefault()
    let data = {
        'login': email_field.value,
        'password': password_field.value,
    }
    error_text.innerText = ''
    $.ajax({
        url: `${API_URL}/login`, //куда
        method: "post", // как
        dataType: "json", //тип посылки
        headers: {
            'Content-Type': "application/json"
        },
        data: JSON.stringify(data), // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            localStorage.setItem("auth", data.token)
            location.href = `${HOME_URL}/index.html`
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
            if (error.responseJSON.message) {
                error_text.innerText = error.responseJSON.message
            }
        }
    })
}
