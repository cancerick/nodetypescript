# Pasos para ejecutar aplicación

Para poder ejecutar la aplicación disponemos de 2 opciones:
- **manual**
- **docker**

#### Supuestos:
Antes de ejecutar, se considera necesario indicar un archivo **.env** en la raíz del proyecto, si se omite existe en el código el remplazo de los datos para un ambiente de prueba y su contenido es el siguiente:

	API_SECRET_TOKENs=generarClaveSecreta
	DB_NAME=api_db
	DB_USER=root
	DB_PASS=api00
	DB_HOST=localhost
	NODE_ENV=desarrollo

Adicionalmente en la raíz del proyecto se encuenta el archivo **docker-compose.yml** para correr la aplicación en contenedor,

## Manual

Ejecutamos los siguientes comandos en la ventana de comandos posicionándonos en la carpeta de la aplicación:	
- **npm install** : para instalar los paquetes requeridos
-	**npm run build-test** : con este comando se ejectua el compilado del typescrypt e inmediatamente ejecuta las pruebas.
-	**npm run start** : se levanta el servidor en el host http://localhost:3000

## Docker
Para ejecutar el **docker-compose.yml**, si se desea utilizar ésta opción se puede instalar siguiente la liga https://docs.docker.com/engine/install/ .

Ejecutamos los siguientes comandos en la ventana de comandos posicionándonos en la carpeta de la aplicación:
- En el archivo **docker-compose.yml** en el nodo *node_api*, existe un elemeneto **environment**, que se le puede indicar al contenedor **node_api**, las variables de entorno que se desee utilizar.

        environment:
          - NODE_ENV=production
          - API_TOKEN=generarClave
          - DB_NAME=api_db
          - DB_USER=root
          - DB_PASS=api00
          - DB_HOST=db_api
          - DB_DIALECT=mysql

- **docker compose up -d** : se generan 2 contenedores;
	-  uno para **mysql**, llamdo **db_api**
	-  otro para el servidor **node**, llamado **node_api**
- Podemos ver el seguimiento de logs del contenedor del servidor con el siguiente comando;
	- **docker logs -f node_api** ; se verán los pasos de los testing y posteriormente iniciar el servidor.
- Para eliminar los contenedores se escribe **docker compose down -v**.

## API disponibles
En la aplicación se cuenta con las siguientes endpoint con la url base **http://localhost:3000** :

#### Para **api/auth**
- **/api/auth/register**:
	- con el body request
		``` json
		{
			"username": "user01",
			"password": "pass01"
		}
		```
	- y su resultado correcto;
	    ``` json
	    {
            "id": 1,
            "username": "user01"
        }
	    ```

- **api/auth/login**:
	- con el body request
		``` json
		{
			"username": "user01",
			"password": "pass01"
		}
		```
	- y su resultado correcto;
		``` json
		{
			"id":  1,
			"username":  "user01",
			"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTY4OTY5OTk5NSwiZXhwIjoxNjg5NzAwMjk1fQ.VImT9Pd3nzSYPWGrzYJDL91naJi5fGg7N7VdnySE1os"
		}
		```

#### Para **api/post**
Es necesario mandar en el header el token obtenido al ejecutar el login:
- header:
    - Authorization: Bearer {token}

- **/api/post**:
    - sin body request, sóo incluir el header
    - resultado sin datos:
        ``` json
        { "message": "No existen post registrados." }
        ```
    - resultado con datos
        ``` json
        [
            {
                "id": 1,
                "userId": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
                "id": 2,
                "userId": 1,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            ...
        ]
        ```
- **/api/post/register**: Éste endpoint registra en bd todos los post que se consume desde la url https://jsonplaceholder.typicode.com/posts
    - sin body request, sóo incluir el header
    - resultado:
        ``` json
        { "message": "100 post registrados a la bd." }
        ```

#### Para **api/comment**
Es necesario mandar en el header el token obtenido al ejecutar el login:
- header:
    - Authorization: Bearer {token}

- **/api/comment**:
    - sin body request, sóo incluir el header
    - resultado sin datos:
        ``` json
        { "message": "No existen comments registrados." }
        ```
    - resultado con datos
        ``` json
        [
            {
                "id": 1,
                "postId": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.biz",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            },
            {
                "id": 2,
                "postId": 1,
                "name": "quo vero reiciendis velit similique earum",
                "email": "Jayne_Kuhic@sydney.com",
                "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis         occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
            },
            ...
        ]
        ```
- **/api/comment/register**: Éste endpoint registra en bd todos los cooment que se consume desde la url https://jsonplaceholder.typicode.com/comments
    - sin body request, sóo incluir el header
    - resultado:
        ``` json
        { "message": "500 comments registrados a la bd." }
        ```