from .DB import DB
import hashlib
class User:
    def __init__(self) -> None:
        self.__db = DB()
        
    def register(self, data):
        try:
            cursor = self.__db.getCursor()
            sql = "INSERT INTO `users` (`email`, `password`, `name`) VALUES (%(login)s, %(password)s, %(name)s)"
            cursor.execute(sql,{
                "login":data['login'],
                "password":data['password'],
                "name":data['name'],
            })
            self.__db.commitDB()
            self.__db.closeConnect()
        except Exception as e:
            if (type(e).__name__ == "IntegrityError"):
                return {
                    'status':False,
                    "message":"User with this email is alredy create"
                }
            return {
                'status':False,
                "message":"Error Register" + str(e.args[1])
            }
        return {
            'status':True,
            'message':"Register is succesfully"
        }


    def get_user_by_id(self, id_user):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT *, DATE_FORMAT(`date_start`, '%Y/%m/%d') as date_start FROM `users` WHERE `id` = %(id_user)s"
            cursor.execute(sql, {
                'id_user':id_user
            })
            user = cursor.fetchone()
            self.__db.closeConnect()
        except :
            return {
                'status':False,
                "message":"Error Get Users"
            }
        return {
            'status':True,
            'users':user
        }
    

    def get_all_users(self):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT * FROM `users` WHERE 1"
            cursor.execute(sql)
            user = cursor.fetchall()
            self.__db.closeConnect()
        except :
            return {
                'status':False,
                "message":"Error Get Users"
            }
        return {
            'status':True,
            'users':user
        }
    
    def update_tg_by_user(self, id, tg):
        try:
            cursor = self.__db.getCursor()
            sql = "UPDATE `users` SET `tg` = %(tg)s WHERE `id` = %(id)s "
            cursor.execute(sql, {
                "id":id,
                "tg":tg
            })
            self.__db.commitDB()
            count = cursor.rowcount
            self.__db.closeConnect()
        except Exception as e:
            print(e)
            return False
        if (count):
            return True
        else:
            return False