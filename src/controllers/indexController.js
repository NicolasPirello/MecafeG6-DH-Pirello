const path = require('path');

let indexController = {

    home: (req, res) => {

        res.render(path.resolve(__dirname, "../views/home.ejs"))

    },
    
    notAuth: (req, res) => {

        res.render(path.resolve(__dirname, "../views/notAuth.ejs"))

    }
    
}

module.exports = indexController;