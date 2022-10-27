const path = require('path');

let globalMiddlewares = {

    error404: (req, res, next) => {
        res.status(404).render(path.resolve(__dirname,"../views/partials/error404.ejs"))
        next();
    }

}

module.exports = globalMiddlewares;

