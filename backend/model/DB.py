import mysql.connector
class DB:
    
    def __init__(self) -> None:
        self.__user_name = 'root'
        self.__password = ''
        self.__host = '127.0.0.1'
        self.__database = 'game_db'
        self.__cnx = None
        self.__cursor = None
    
    def getCursor(self):
        try:
            self.__cnx = mysql.connector.connect(
                user=self.__user_name,
                password=self.__password,
                host=self.__host,
                database=self.__database
            )
            self.__cursor = self.__cnx.cursor(dictionary=True)
        except:
            print("Ошибка подключения к БД")
            return False
        return self.__cursor

    def closeConnect(self) -> None:
        self.__cursor.close()
        self.__cnx.close()
    
    def commitDB(self) -> None:
        self.__cnx.commit()