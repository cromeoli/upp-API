# Upp Api

## Resumen de la aplicación

Upp es una red social basada en el contenido, para ello podrás unirte a círculos concretos de tu tema favorito y subir tan solo un número limitado de publicaciones para que compitan en el ranking global o con tus amigos

---

## Endpoints

Nota: Para probar los endpoints he añadido el archivo "endpointTests.json" para Insomnia que puede importarse y contiene las rutas ya definidas con las que he ido haciendo pruebas.


La API de Upp tiene los siguientes endpoints definidos:

### Posts (Publicaciones)

| Descripción                        | Endpoints                  | Método |
| ---------------------------------- | -------------------------- | ------ |
| Obtener un post concreto por su ID | /api/v1/posts/:id | GET    |
| Obtener los 10 primeros posts      | /api/v1/posts              | GET    |
| Obtener 10 posts de la página "x"  | /api/v1/posts/pages/:x     | GET    |
| Eliminar un post                   | /api/v1/posts/:id | DELETE |
| Modificar un post                  | /api/v1/posts/:id | PUT    |
| Crear un post                      | /api/v1/posts              | POST   |

### Usuarios

| Descripción                                   | Endpoints                  | Método |
| --------------------------------------------- | -------------------------- | ------ |
| Registrar un usuario                          | /api/v1/users              | POST   |
| Modificar un usuario                          | /api/v1/users/:id          | PUT    |
| Eliminar un usuario                           | /api/v1/users/:id          | DELETE    |
| Comprobar si el email de un usuario existe    | /api/v1/users/email/:email | GET |
| Comprobar si el nickname de un usuario existe | /api/v1/users/user/:username | GET    |

---

### Extra

#### Rutas con autorización
La api tiene implementado un sistema de autenticación que utiliza JSON Web token, pero en las últimas pruebas algo iba mal y no me ha dado tiempo a arreglarlo. La idea original era que un usuario debía loguearse y obtener un JWT para acceder a las siguientes rutas:

#### Usuario

| Descripción                                   | Endpoints                  | Método |
| --------------------------------------------- | -------------------------- | ------ |
| Modificar un usuario                          | /api/v1/auth/users/:id          | PUT    |
| Eliminar un usuario                           | /api/v1/auth/users/:id          | DELETE    |

#### Publicaciones

| Descripción       | Endpoints              | Método |
| ----------------- | ---------------------- | ------ |
| Eliminar un post  | /api/v1/auth/posts/:id | DELETE |
| Modificar un post | /api/v1/auth/posts/:id | PUT    |
| Crear un post     | /api/v1/auth/posts     | POST   |

---
