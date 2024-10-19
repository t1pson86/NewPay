function get_products() {
    $.ajax({
        url: `${API_URL}/products`, //куда
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

function print_products(products) {
    print__tovars_for_category('comp__block', products.comp)
    print__tovars_for_category('mob__block', products.mob)
    print__tovars_for_category('app__block', products.app)
}


function print__tovars_for_category(id_cat, data) {
    let category = document.querySelector(`#${id_cat}`)
    if (category) {
        category.innerHTML = ``
        data.forEach(product => {
            category.innerHTML +=
                `
     <div class="logo-game">
                    <a href="game.html?id=${product.id}"><img src="./images/${product.image}"></a>
                   <a href=""><p>${product.name}</p></a>
                </div>
            `
        });
    }
}