const posts = require("./posts.json")
const fs = require("fs")


/*
* Devuelve 10 posts páginados
* */
const getTenPosts = (pages) => {

    let perPage = 10;

    let start = perPage * (pages - 1);
    let end = perPage * pages;

    const allPosts = posts.posts.slice(start,end)

    return allPosts;

}

const getOnePost = (id) => {
    const onePost = posts.posts.find(
        post => id == post.id)
    return onePost
}

const insertOnePost = (newPost) => {

    // Modificamos el objeto datos
    posts.posts.push(newPost);

    // Escribimos los nuevos datos en el fichero JSON
    fs.writeFileSync(
        "./src/database/posts.json",
        JSON.stringify(posts, null, 2),
        "utf8"
    );

    return newPost;
}

const updateOnePost = (id, nuevosDatos) => {

    // Comprobamos que exista la publicación
    const onePost = posts.posts.findIndex(post => post.id === id)

    if (!onePost) {

        //Si no existe, devolvemos false
        return false;

    } else {

        // Cambiamos los datos
        posts.posts[onePost] = nuevosDatos;

        // Para devolver el resultado final creamos esta variable con los datos ya actualizados
        const updatedPost = posts.posts[onePost]


        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/posts.json",
            JSON.stringify(posts, null, 2),
            "utf8"
        );

        return updatedPost;

    }
}

const deleteOnePost = (id) => {

    // Vemos si existe el producto
    const postIndex = posts.posts.findIndex(post => post.id === id)

    if (postIndex === -1) {

        // Si no existe, devolvemos false
        return false;

    } else {

        // Borramos el producto del objeto datos
        const deletedPost = posts.posts.splice(postIndex, 1);

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/posts.json",
            JSON.stringify(posts, null, 2),
            "utf8"
        );

        return deletedPost;

    }

};

// Export de las funciones para poder utilizarlas luego
module.exports = {
    getTenPosts,
    getOnePost,
    insertOnePost,
    deleteOnePost,
    updateOnePost
}