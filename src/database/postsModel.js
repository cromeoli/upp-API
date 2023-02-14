const posts = require("./posts.json")
const fs = require("fs")


/*
* Devuelve 10 posts páginados
* */
const getTenPosts = (pages) => {

    let perPage = 10;

    let start = perPage * (pages - 1);
    let end = perPage * pages;

    const allPosts = Object.entries(posts.posts).slice(start,end).map(entry => entry[1])

    return allPosts;

}

const getOnePost = (id) => {
    const onePost = posts.posts[id]
    return onePost
}

const insertOnePost = (id,newPost) => {

    // Modificamos el objeto datos
    posts.posts[id] = newPost;

    // Escribimos los nuevos datos en el fichero JSON
    fs.writeFileSync(
        "./src/database/posts.json",
        JSON.stringify(posts, null, 2),
        "utf8"
    );

    return newPost;
}

const deleteOnePost = (id) => {

    // Vemos si existe el producto
    const onePost = getOnePost(id);

    if (!onePost) {

        // Si no existe, devolvemos false
        return false;

    } else {

        // Borramos el producto del objeto datos
        delete posts.posts[id];

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/posts.json",
            JSON.stringify(posts, null, 2),
            "utf8"
        );

        return onePost;

    }

};

const updateOnePost = (id, nuevosDatos) => {

    // Comprobamos que exista la publicación
    const onePost = getOnePost(id);

    if (!onePost) {

        //Si no existe, devolvemos false
        return false;

    } else {

        // Cambiamos los datos
        posts.posts[id] = nuevosDatos;

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/posts.json",
            JSON.stringify(posts, null, 2),
            "utf8"
        );

        return onePost;

    }
}

// Export de las funciones para poder utilizarlas luego
module.exports = {
    getTenPosts,
    getOnePost,
    insertOnePost,
    deleteOnePost,
    updateOnePost
}