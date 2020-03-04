
export const DBConnection =  
    {
        connection1: <any> {
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "",
            "database": "expressDB",
            "synchronize": true,
            "entities": [
               "src/entity/**/*.ts"
            ],
            "migrations": [
               "src/migration/**/*.ts"
            ],
            "subscribers": [
               "src/subscriber/**/*.ts"
            ],
            "cli": {
               "entitiesDir": "src/entity",
               "migrationsDir": "src/migration",
               "subscribersDir": "src/subscriber"
            }
         },
        connection2: <any>{
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "",
            "database": "typeorm",
            "synchronize": true,
            "entities": [
               "src/entity/**/*.ts"
            ],
            "migrations": [
               "src/migration/**/*.ts"
            ],
            "subscribers": [
               "src/subscriber/**/*.ts"
            ],
            "cli": {
               "entitiesDir": "src/entity",
               "migrationsDir": "src/migration",
               "subscribersDir": "src/subscriber"
            }
         }
    } 

