let params = new URLSearchParams(document.location.search);
let id = params.get('id');

function get_tovars() {
    $.ajax({
        url: `${API_URL}/tovars/product/${id}`, //куда
        method: "get", // как
        dataType: "json", //тип посылки
        data: {}, // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            print_tovars(data.tovars)
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
        }
    })
}

function get_product() {
    $.ajax({
        url: `${API_URL}/products/${id}`, //куда
        method: "get", // как
        dataType: "json", //тип посылки
        data: {}, // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            print_product(data.game)
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
        }
    })
}

get_tovars()
get_product()

function print_tovars(tovars) {
    let block = document.querySelector('.main-tovar-section')
    if (block) {
        block.innerHTML = ``
        if (tovars.length == 0) {
            block.innerHTML = `<p class="col_white">Товары отсутствуют</p>`
        }
        else {
            tovars.forEach(tovar => {
                block.innerHTML +=
                    `
                <div class="section-tovar">
                    <a href="tovar.html?id=${tovar.id}">
                        <div class="image_tovar_section" style="background-image: url(./images/${tovar.image});"></div>
                    </a>
                    <div>
                        <div class="price_tovar_section">
                            <p>Цена ~ ${tovar.price} ${tovar.valute}</p>
                        </div>
                        <div class="description_tovar_section">
                            <p>${tovar.description}</p>
                        </div>
                    </div>
                </div>
                `
            });
        }
    }

}


function print_product(game) {
    let block = document.querySelector('.header_info_game')
    if (block) {
        block.innerHTML =
            `
        <div class="info_game container">
            <img src="./images/${game.image}" alt="">
            <div class="description_info">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
            </div>
        </div>
        `
    }
}
