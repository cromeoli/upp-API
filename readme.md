# Upp Api

## Resumen de la aplicación

Upp es una red social basada en el contenido, para ello podrás unirte a círculos concretos de tu tema favorito y subir tan solo un número limitado de publicaciones para que compitan en el ranking global o con tus amigos

---

## Endpoints

Nota: Para probar los endpoints he añadido el archivo "endpointTests.json" para Insomnia que puede importarse y contiene las rutas ya definidas con las que he ido haciendo pruebas.

Para importarlo y no tener problemas lo hice así:

1.![tuto1](https://user-images.githubusercontent.com/92324278/219983482-8faec9b5-6cf7-4c7f-bffd-912169d0023f.gif)
2.![tuto2](https://user-images.githubusercontent.com/92324278/219983485-6bf80dc8-1f6a-49b9-8c0d-5d30c398086b.gif)

La API de Upp tiene los siguientes endpoints públicos (No requieren un token de autorización) definidos:

### Posts (Publicaciones)

| Descripción                        | Endpoints                  | Método |
| ---------------------------------- | -------------------------- | ------ |
| Obtener un post concreto por su ID | /api/v1/posts/:id | GET    |
| Obtener los 10 primeros posts      | /api/v1/posts              | GET    |
| Obtener 10 posts de la página "x"  | /api/v1/posts/pages/:x     | GET    |

### Usuarios

| Descripción                                   | Endpoints                  | Método |
| --------------------------------------------- | -------------------------- | ------ |
| Registrar un usuario                          | /api/v1/users              | POST   |
| Comprobar si el email de un usuario existe    | /api/v1/users/email/:email | GET |
| Comprobar si el nickname de un usuario existe | /api/v1/users/user/:username | GET    |


### Rutas con autorización

La api tiene implementado un sistema de autenticación que utiliza JSON Web token, por lo que para acceder a ciertos endpoints 
necesitas hacer una petición de login para recibir un token válido con el que realizar todas las demás. 
Si no tienes token, se recibe un error 401 (Not autorized). 

Los endpoints son los siguientes:

#### Usuario

| Descripción                                   | Endpoints                  | Método |
| --------------------------------------------- | -------------------------- | ------ |
| Hacer Login                                   | /api/v1/auth/users | POST |
| Modificar un usuario                          | /api/v1/auth/users/:id          | PUT    |
| Eliminar un usuario                           | /api/v1/auth/users/:id          | DELETE    |

#### Publicaciones

| Descripción       | Endpoints              | Método |
| ----------------- | ---------------------- | ------ |
| Eliminar un post  | /api/v1/auth/posts/:id | DELETE |
| Modificar un post | /api/v1/auth/posts/:id | PUT    |
| Crear un post     | /api/v1/auth/posts     | POST   |

---
