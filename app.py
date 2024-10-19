from flask import Flask, jsonify, request
from flask_cors  import CORS
import hashlib
from backend.model.Auth import Auth
from backend.model.User import User
from backend.model.Game import Game
from backend.model.Tovar import Tovar
from Validate import Validate
from random import randint


app = Flask(__name__)

CORS(app)

@app.route('/auth', methods=['POST']) #авторизация
def auth():
    data = request.get_json()
    valid = Validate.required(data, ['login', 'password'])
    if not valid['status']:
        return jsonify(valid), 400
    hash_password = hashlib.md5(data['password'].encode())
    data['password'] = hash_password.hexdigest()
    auth = Auth()
    is_authorize = auth.autorizate(data['login'], data['password'])
    if is_authorize['status']:
        return jsonify(is_authorize), 201
    return jsonify(is_authorize), 400


@app.route('/register', methods=['POST']) #регистрация
def register():
    data = request.get_json()
    valid = Validate.required(data, ['login', 'password', 'name'])
    if not valid['status']:
        return jsonify(valid), 400
    user = User()
    hash_password = hashlib.md5(data['password'].encode())
    data['password'] = hash_password.hexdigest()
    isRegister = user.register(data)
    if not isRegister['status']:
        return jsonify(isRegister), 400
    return jsonify(isRegister), 201

@app.route('/login', methods=['POST']) #авторизация
def login():
    data = request.get_json()
    valid = Validate.required(data, ['login', 'password'])
    if not valid['status']:
        return jsonify(valid), 400
    auth = Auth()
    hash_password = hashlib.md5(data['password'].encode())
    data['password'] = hash_password.hexdigest()
    isLogin = auth.autorizate(data['login'], data['password'])
    if not isLogin['status']:
        return jsonify(isLogin), 400
    return jsonify(isLogin), 201

@app.route('/products', methods=['GET']) #получить все продукты po categores
def get_products():
    game = Game()
    is_game = game.get_games_by_categories()
    if is_game['status']:
        return jsonify(is_game), 200
    return jsonify(is_game), 400

@app.route('/products/all', methods=['GET']) #получить все продукты
def get_products_all():
    game = Game()
    is_game = game.get_all()
    if is_game['status']:
        return jsonify(is_game), 200
    return jsonify(is_game), 400

@app.route('/users', methods=['GET']) #получить всех пользователей
def get_users():
    user = User()
    is_user = user.get_all_users()
    if is_user['status']:
        return jsonify(is_user), 200
    return jsonify(is_user), 400

@app.route('/products/<int:id_product>', methods=['GET']) #получить один продукт по Id
def get_product(id_product):
    game = Game()
    is_game = game.get_game_by_id(id_product)
    if is_game['status']:
        return jsonify(is_game), 200
    return jsonify(is_game), 400

@app.route('/tovars/product/<int:id_product>', methods=['GET']) #получить все товары одной игры
def get_tovars(id_product):
    tovar = Tovar()
    is_tovars = tovar.get_tovars_by_game(id_product)
    if is_tovars['status']:
        return jsonify(is_tovars), 200
    return jsonify(is_tovars), 400

@app.route('/tovars/<int:id_tovar>', methods=['GET']) #получить все данные о товаре
def get_tovar(id_tovar):
    tovar = Tovar()
    is_product = tovar.get_tovar_by_id(id_tovar)
    if is_product['status']:
        return jsonify(is_product), 200
    return jsonify(is_product), 400

@app.route('/tovars', methods=['POST']) #добавить товар
def add_tovar():
    data = dict(request.form)
    auth = Auth()
    is_auth = auth.is_auth(data)
    if not is_auth:
        return jsonify("Вы не авторизованы"), 401
    image = request.files['image']
    type_image = image.content_type
    valid = Validate.required(data, ['name', 'price', 'valute', 'token'])
    print(type_image)
    if (type_image != 'image/jpeg' and type_image != 'image/png'):
        return jsonify("Фото поддерживает только следующие форматы: jpeg, png"), 400
    if (valid['status']):
        name_image = str(randint(10000, 99999)) + image.filename[-1:-11:-1][::-1]
        data['id_user'] = is_auth
        data['image'] = name_image
        try:
            image.save('images/' + name_image)
        except Exception as e:
            print(e)
            return jsonify("Не удалось добавить фотографию "), 400
        tovar = Tovar()
        addTovar = tovar.add_tovar(data)
        if addTovar['status'] and addTovar['count']:
            return jsonify(f"Товар {data['name']} успешно добавлен "), 201
    return jsonify("Произошла ошибка при добавлении товара, проверьте данные и попробуйте позже"), 400

@app.route('/profile/user', methods=['POST']) # получить все данные о пользователе
def get_profile_user():
    data = request.get_json()
    auth = Auth()
    is_auth = auth.is_auth(data)
    if not is_auth:
        return jsonify("Вы не авторизованы"), 401
    user = User()
    data_user = user.get_user_by_id(is_auth)
    if (data_user['status']):
        return jsonify({
            "image":data_user['users']['image'],
            "name":data_user['users']['name'],
            "date_start":data_user['users']['date_start'],
            "tg":data_user['users']['tg'],
        })
    else:
        return jsonify(data_user), 400  

@app.route('/profile/changetg', methods=['PUT']) # получить все данные о пользователе
def change_tg_user():
    data = request.get_json()
    auth = Auth()
    is_auth = auth.is_auth(data)
    if not is_auth:
        return jsonify("Вы не авторизованы"), 401
    user = User()
    is_update = user.update_tg_by_user(is_auth, data['tg'])
    if (is_update):
        return jsonify({
            "message":"Телеграмм успешно обновлен"
        })
    else:
        return jsonify("Не удалось обносить ТГ"), 400  

@app.route('/example', methods=['POST']) #пример проверки на авторизацию
def example():
    data = request.get_json()
    valid = Validate.required(data, ['token'])
    if not valid['status']:
         return jsonify(valid), 400
    auth = Auth()
    is_auth = auth.is_auth(data)
    if not is_auth:
        return jsonify("Вы не авторизованы"), 401
    return "Route is work", 200



if __name__ == '__main__':
    app.run()
    
