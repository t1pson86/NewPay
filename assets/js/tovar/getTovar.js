let params = new URLSearchParams(document.location.search);
let id = params.get('id');

function getTovar() {
    $.ajax({
        url: `${API_URL}/tovars/${id}`, //куда
        method: "get", // как
        dataType: "json", //тип посылки
        data: {}, // что отправляете
        success: function (data) { // если запрос успешный
            console.log(data)
            print_tovar(data.games)
        },
        error: function (error) { // если запрос плохой
            console.log("Ошибка запроса на API")
            console.log(error)
        }
    })
}

getTovar()


function print_tovar(tovar) {
    let block = document.querySelector("#Detailed_description")
    let auth_state = localStorage.getItem("auth")
    if (block) {
        if (tovar) {
            let buy = auth_state ? `<a target="_blank" href="${tovar.telegram ? tovar.telegram : `mailto:${tovar.email}`}" class="btn btn-buy-tovar">Купить</a>` : `<a class="btn btn-buy-tovar" href="${HOME_URL + "/index.html"}">Купить</a>`
            block.innerHTML =
                `
            <div class="tovar-description container">
                <h1>${tovar.name}</h1>
                <div class="tovar-description-main">
                    <div class="tovar-description-info">
                        <img src="./images/${tovar.image}">
                    </div>
                    <div class="tovar-description-info-text">
                        <h2>Подробное описание</h2>
                        <p>${tovar.description}</p>
                    </div>
                </div>
                <hr class="bottom-description">
                <div class="price-list">
                    <div class="price-info">
                        <h2>Цена данного товара</h2>
                        <p>${tovar.price} ${tovar.valute}</p>
                        <div class="duy-tovar">${buy}</div>
                    </div>
    
                    <div class="any-way">
                        <div class="any-way-card">
                            <h2>Способы оплаты</h2>
                            <div class="any-way-card-img">
                                <img src="./images/master card.png" alt="">
                                <img src="./images/credit-card.png" alt="">
                                <img src="./images/visa.png" alt="">
                                <img src="./images/оборудование.png" alt="">
                                <img src="./images/debetovaya-card.png" alt="">
                                <div class="bottom-text">
                                    <p>Возникла проблема с оплатой? Обраититесь <a href="">СЮДА</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        else {
            block.innerHTML = `<p class="col_white">Товара с таким ID нет, либо товар уже куплен<p>`
        }
    }
}


