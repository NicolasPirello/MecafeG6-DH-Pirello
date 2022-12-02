const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan'); /* Instalacion de Morgan */
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authMiddlewares = require('./src/middlewares/authMiddlewares');
const cors = require("cors")
// IMPORTANTISIMA LINEA, NO OLVIDAR
require("dotenv").config()


app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 
app.use(morgan('tiny')); /* Lo unico que se necesita para monitorear con Morgan */
app.use(session( {secret: 'navegando por meCafe', resave: false, saveUninitialized: false }));
app.use(cookieParser());
/** 
 * middleware que inserta en local user (para obtener obtener esos valores en cualquier vista)
 * También se utiliza para pasar valores de errores a login (mas adelante mover a otro middleware)
*/
app.use(authMiddlewares.userLogged);
app.use(authMiddlewares.errorsLogin);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const indexRoutes = require('./src/routes/index');
const cartRoutes = require('./src/routes/cart');
const productRoutes = require('./src/routes/product');
const userRoutes = require('./src/routes/user');
const saleRoutes = require('./src/routes/sale');
const directionRoutes = require('./src/routes/direction');
const typeGrindingRoutes = require('./src/routes/typeGrinding');
const apisRoutes = require('./src/routes/api/apis');
const globalMiddleware = require('./src/middlewares/globalMiddlewares');


app.use('/',indexRoutes);
app.use('/cart',cartRoutes);
app.use('/product',productRoutes);
app.use('/user',userRoutes);
app.use('/sale',saleRoutes);
app.use('/user',directionRoutes);
app.use('/type-grinding',typeGrindingRoutes); // Corri esto para arriba del error404 porque sino no funcaba.
app.use(cors())
app.use('/api',apisRoutes);
app.use(globalMiddleware.error404);

// app.listen(3030,() => console.log("Servidor escuchando en puerto 3030"));

// Esto nos permite leer si hay algun puerto de algun servicio o en su caso contrario ejecutarlo en el Local 3030

app.listen( process.env.PORT || 3030, () => {
    console.log("Servidor escuchando en puerto: ", process.env.PORT || 3030) //3030
})

