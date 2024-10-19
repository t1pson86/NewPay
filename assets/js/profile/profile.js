guard("user")


function getUser() {
    $.ajax({
        url: `${API_URL}/profile/user`, //куда
        method: "post", // как
        dataType: "json", //тип посылки
        headers: {
            'Content-Type': "application/json"
        },
        data: JSON.stringify({
            "token": localStorage.getItem('auth')
        }), // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            print_user(data)
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
        }
    })
}

getUser()


function print_user(user) {
    let block = document.querySelector("#profile__section")
    if (block) {
        if (user) {
            block.innerHTML =
                `
            <div class="profile_block">
                <div class="profile_block_img">
                    <img src="${HOME_URL + "/images/" + (user.image ?? "noname.png")}">
                </div>
                <div class="name_profile">
                    <h2>${user.name}</h2>
                </div>
                <div class="date_start_profile">
                    <h6>ДАТА РЕГИСТРАЦИИ</h6>
                    <p>${user.date_start}</p>
                </div>
                <div class="telegram_name_inp grayColor">
                    <p>Чтобы покупатель смог с вами связаться,<br> оставьте ссылку на свой Telegram !</p>
                </div>
                <div>
                  <input value="${user.tg ?? ""}" type='text' id='username' class="tg_text" placeholder="Ваша ссылка..." name='username'><br>
                  <button onclick="change_tg()" class="btn-tg">Отправить</button>
                </div>
            </div>        
            `
        }
        else {
            block.innerHTML = `<p class="col_white">Пользователь с таким ID не найден, или его уже не существует !<p>`
        }
    }
}

function change_tg() {
    let tg_inp = document.querySelector('.tg_text')
    if (tg_inp) {
        let tg_value = tg_inp.value
        if (tg_value.length > 10) {
            $.ajax({
                url: `${API_URL}/profile/changetg`, //куда
                method: "put", // как
                dataType: "json", //тип посылки
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify({
                    "token": localStorage.getItem('auth'),
                    "tg": tg_value
                }), // что отправляете
                success: function (data) { // если запрос успешный
                    console.log(data)
                },
                error: function (error) { // если запрос плохой
                    console.log("Ошибка запроса на API")
                    alert("Не удалось изменить ТГ")
                }
            })
        } else {
            alert("Неверная ссылка на ТГ")
        }
    }

}