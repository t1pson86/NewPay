from .DB import DB

class Game:
    def __init__(self) -> None:
        self.__db = DB()

    def get_games_by_categories(self):
        try:
            games = {}
            cursor = self.__db.getCursor()
            sql = "SELECT * FROM `products` WHERE `id_category` = 1"
            cursor.execute(sql)
            games['comp'] = cursor.fetchall()
            sql = "SELECT * FROM `products` WHERE `id_category` = 2"
            cursor.execute(sql)
            games['mob'] = cursor.fetchall()
            sql = "SELECT * FROM `products` WHERE `id_category` = 3"
            cursor.execute(sql)
            games['app'] = cursor.fetchall()
            self.__db.closeConnect()
        except :
            return {
                'status':False,
                "message":"Error Get Games"
            }
        return {
            'status':True,
            'games':games
        }
    
    def get_all(self):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT * FROM `products`"
            cursor.execute(sql)
            res = cursor.fetchall()
            self.__db.closeConnect()
        except :
            return {
                'status':False,
                "message":"Error Get Games"
            }
        return {
            'status':True,
            'games':res
        }
    
    def get_game_by_id(self, id):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT * FROM `products` WHERE `id` = %(id)s"
            cursor.execute(sql, {
                "id":id
            })
            game = cursor.fetchone()
            self.__db.closeConnect()
        except Exception as e:
            print(e)
            return {
                'status':False,
                "message":"Error Get Game"
            }
        return {
            'status':True,
            'game':game
        }

   