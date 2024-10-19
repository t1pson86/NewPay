from .DB import DB

class Tovar:
    def __init__(self) -> None:
        self.__db = DB()

    def get_tovars_by_game(self, id_product):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT * FROM `tovars` WHERE `id_product` = %(id_product)s"
            cursor.execute(sql, {
                'id_product':id_product
            })
            tovars = cursor.fetchall()
            self.__db.closeConnect()
        except Exception as e:
            print(e.args)
            return {
                'status':False,
                "message":f"Error Get Tovars"
            }
        return {
            'status':True,
            'tovars':tovars
        }
    
    def get_tovar_by_id(self, id_tovar):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT t.*, u.`tg` as telegram, u.`email` FROM `tovars` t JOIN `users` u WHERE  t.`id_user` = u.`id` AND t.`id` = %(id_tovar)s"
            cursor.execute(sql, {
                'id_tovar':id_tovar
            })
            tovar = cursor.fetchone()
            self.__db.closeConnect()
        except :
            return {
                'status':False,
                "message":"Error Get Tovars"
            }
        return {
            'status':True,
            'games':tovar
        }
    

    def add_tovar(self, data):
        try:
            cursor = self.__db.getCursor()
            sql = "INSERT INTO `tovars` (`name`, `description`, `image`, `price`, `valute`, `id_product`, `id_user`) VALUES (%(name)s, %(description)s,%(image)s,%(price)s,%(valute)s,%(id_product)s,%(id_user)s)"
            cursor.execute(sql,{
                "name":data['name'],
                "description":data['description'],
                "image":data['image'],
                "price":data['price'],
                "valute":data['valute'],
                "id_product":data['id_product'],
                "id_user":data['id_user'],
            })
            count = cursor.rowcount
            self.__db.commitDB()
            self.__db.closeConnect()
        except Exception as e:
            return {
                'status':False,
                "message":"Error Register" + str(e.args[1])
            }
        return {
            'status':True,
            'count':count,
            'message':"Succesfully add Tovar"
        }

    
        
   