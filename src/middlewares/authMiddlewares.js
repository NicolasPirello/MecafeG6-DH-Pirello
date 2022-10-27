const path = require('path');

let authMiddlewares = {
    
    //proteger rutas en las que no se debe estar logeado
    guestMiddleware: function (req, res, next) {
        if(req.session.user){
            return res.redirect('/');
        }    
        next();
    }, 

    //proteger rutas en las que necesitas estar logeado GET
    authMiddleware: function(req, res, next){
        if(!req.session.user){
            res.locals.openLogin = true;
            return res.render(path.resolve(__dirname,"../views/notAuth.ejs"));
        }

        next();
    },

    //proteger rutas en las que necesitas estar logeado POST
    authMiddlewarePost: function(req, res, next){
        if(!req.session.user){
            return res.redirect('/');
        }
        next();
    },

    //proteger rutas que en las que debes ser admin
    adminMiddleware: function(req, res, next){
        if(req.session.user && req.session.user.role_id != 1){
            return res.redirect('/');
        }
        next();
    },

    //enviar user logeado
    userLogged :function(req, res, next){
        res.locals.isLogged = false;
        if(req.session.user){
            res.locals.user = {
                'name': req.session.user.name,
                'role': req.session.user.role_id,
            };
        }

        next();
    },

    errorsLogin:function(req, res, next){
        if(req.session.errorsLogin){
            res.locals.errorsLogin = req.session.errorsLogin;
            req.session.errorsLogin = undefined;
            res.locals.openLogin = true;
        }

        res.locals.openLogin = false;
        next();
    }

}

module.exports = authMiddlewares;