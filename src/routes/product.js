const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController.js')
const authMiddlewares = require('../middlewares/authMiddlewares');
const multer = require ("multer")
const path = require ("path")
const {check} = require('express-validator');


/* Validaciones de la creacion de un Producto.

Esto es lo que viene del body mas las imagenes. (req.body y req.file)

Nombre de product: nameProduct: '',
Peso: weightProduct1: '250',
Precio: priceProduct1: '',
Peso: weightProduct2: '500',
Precio: priceProduct2: '',
Peso:weightProduct3: '1000',
Precio: priceProduct3: '',
Descripcion: descriptionProduct: '',
Marca del Producto: idBrand: '1',
Categorias: idCategories: [ '2', '3' ],
Rating: ratingProduct: '1' 

Datos de la Imagen - Vienen datos o viene "undefined" (false)

fieldname: 'imageProduct',
originalname: 'unnamed.jpg',
encoding: '7bit',
mimetype: 'image/jpeg',
destination: 'C:\\Users\\Nicolas\\Desktop\\Digital House - Programacion Web\\ProyectoMeca\\grupo_6_cafeMeca\\mecafe\\public\\img\\productos',
filename: 'productImage - 1664073598500.jpg',
path: 'C:\\Users\\Nicolas\\Desktop\\Digital House - Programacion Web\\ProyectoMeca\\grupo_6_cafeMeca\\mecafe\\public\\img\\productos\\productImage - 1664073598500.jpg',
size: 9871

/* Pasos para Realizar la Validacion con Express-Validator:

Todo esto se empieza en la hoja de rutas.

1: Importamos const {check} = require('express-validator');
2: Creamos una constante con el nombre que querramos que debera ser un array.
3: Creamos las validaciones que necesitemos, podemos crear tambien validaciones CUSTOM.
4: Esto lo hacemos llamando a check("") donde dentro de las comillas ponemos el name del formulario.
5: Si haces mas de una validacion, a todas las anteriores a la ultima ponerle .bail() para cortar la ejecucion de la que le sigue
6: En la ruta despues de las imagenes de multer ponemos la variable de las validaciones.

Sigo en la hoja de controllers

7: Nos vamos a controladores y pedimos "const { validationResult } = require('express-validator');"

*/

const validationsProduct = [

    check("nameProduct")
        .notEmpty().withMessage("Escribe un nombre de producto.").bail()
        .isLength( {min: 5} ).withMessage("El nombre del producto debe tener mas de 3 caracteres."),

    check("weightProduct1")
        .notEmpty().withMessage("El peso debe ser 250grms.").bail()
        .isNumeric().withMessage("El valor debera ser numerico").bail()
        .contains("250").withMessage("El peso debe ser 250grms. No debera cambiarse el mismo"),

    check("priceProduct1")
        .notEmpty().withMessage("El producto debe tener un precio.").bail()
        .isNumeric().withMessage("El valor del precio debera ser numerico"),

    check("weightProduct2")
        .notEmpty().withMessage("El peso debe ser 500grms.").bail()
        .isNumeric().withMessage("El valor debera ser numerico").bail()
        .contains("500").withMessage("El peso debe ser 500grms. No debera cambiarse el mismo"),

    check("priceProduct2")
        .notEmpty().withMessage("El producto debe tener un precio.").bail()
        .isNumeric().withMessage("El valor del precio debera ser numerico"),

    check("weightProduct3")
        .notEmpty().withMessage("El peso debe ser 1000grms.").bail()
        .isNumeric().withMessage("El valor debera ser numerico").bail()
        .contains("1000").withMessage("El peso debe ser 1000grms. No debera cambiarse el mismo"),

    check("priceProduct3")
        .notEmpty().withMessage("El producto debe tener un precio.").bail()
        .isNumeric().withMessage("El valor del precio debera ser numerico"),

    check("descriptionProduct")
        .notEmpty().withMessage("El producto debera contar con una descripcion").bail()
        .isLength( {min: 15} ).withMessage("La descripcion debera contar con al menos 15 caracteres."),

    check("idBrand")
        .notEmpty().withMessage("Se debera seleccionar una marca."),

    check("idCategories")
        .notEmpty().withMessage("Deberas seleccionar al menos una categoria"),

    check("ratingProduct")
        .notEmpty().withMessage("Deberas seleccionar un rating."),
]




/* Creacion del LocalStorage de Multer */

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
    let saveRouteImageProduct = path.join(__dirname, "../../public/img/productos")
    cb(null, saveRouteImageProduct) 
    },

    filename: function (req, file, cb) {
    let newFileName = "productImage-" + Date.now() + path.extname(file.originalname)
    cb(null, newFileName)
    }

})

const uploadProducts = multer( { storage : storage } )

/* Fin de la creacion de Multer */

router.get('/',productController.index);

router.get(
    '/create',
    authMiddlewares.authMiddleware,
    authMiddlewares.adminMiddleware,
    productController.create
);

router.post(
    '/', 
    authMiddlewares.authMiddlewarePost,
    authMiddlewares.adminMiddleware,
    uploadProducts.single("imageProduct"),
    validationsProduct,
    productController.store
);

router.get(
    '/edit/:id',
    authMiddlewares.authMiddleware,
    authMiddlewares.adminMiddleware,
    productController.edit
);

router.post(
    '/edit/:id',
    authMiddlewares.authMiddlewarePost,
    authMiddlewares.adminMiddleware,
    uploadProducts.single("imageProduct"),
    productController.update
);

router.get('/detail/:id',productController.detail);

router.post(
    '/delete/:id',
    authMiddlewares.authMiddlewarePost,
    authMiddlewares.adminMiddleware,
    productController.destroy
);

router.get(
    '/list',
    authMiddlewares.authMiddleware,
    authMiddlewares.adminMiddleware,
    productController.adminProducts
);


module.exports = router;