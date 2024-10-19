let params = new URLSearchParams(document.location.search);
let id = params.get('id');

function getUser() {
    $.ajax({
        url: `${API_URL}/users/${id}`, //куда
        method: "get", // как
        dataType: "json", //тип посылки
        data: {}, // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            print_user(data.users)
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
                    <img src="./images/${user.image}">
                </div>
                <div class="name_profile">
                    <h2>${user.name}</h2>
                </div>
                <div class="date_start_profile">
                    <h6>ДАТА РЕГИСТРАЦИИ</h6>
                    <p>${user.date_start}</p>
                </div>
            </div>        
            `
        }
        else {
            block.innerHTML = `<p class="col_white">Пользователь с таким ID не найден, или его уже не существует !<p>`
        }
    }
}