from .DB import DB
import hashlib


class Auth:
    def __init__(self) -> None:
        self.__db = DB()

    def get_id_by_login_password(self, login:str, password:str):
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT `id` FROM `users` WHERE `email` = %(login)s AND `password` = %(password)s" 
            cursor.execute(sql,{
                "login": login,
                "password": password
            })
            rez = cursor.fetchone()
            self.__db.commitDB()
            self.__db.closeConnect()
        except:
            return False
        
        if not rez:
            return False
        return str(rez['id'])

    def autorizate(self, login:str, password:str):
        try:
            id_user = self.get_id_by_login_password(login, password)
            print(id_user)
            if not id_user:
                return {
                    "status": False,
                    "message": "User is not defined"
                }
            token = hashlib.md5(id_user.encode())
            token = token.hexdigest()
            cursor = self.__db.getCursor()
            sql = "UPDATE `users` SET `token`=%(token)s WHERE `id`=%(id)s"
            cursor.execute(sql,{
                "token":token,
                "id":id_user
            })
            self.__db.commitDB()
            self.__db.closeConnect()
        except Exception as e:
            print(str(e))
            return {
                "status":False,
                "message": "Erorr server"
            }
        return {
            "status":True,
            "message": "Token create is succesfully",
            "token" : token
        }

    def is_auth(self, data):
        if "token" not in data:
            return False
        
        token = data['token']
        try:
            cursor = self.__db.getCursor()
            sql = "SELECT `id` FROM `users` WHERE `token` = %(token)s"
            cursor.execute(sql,{
                "token":token
            })
            res = cursor.fetchone()
            self.__db.closeConnect()
        except:
            return False
        if not res:
            return False
        else:
            return res['id']

    
    