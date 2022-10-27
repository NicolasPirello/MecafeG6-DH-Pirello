const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { check } = require("express-validator");
const path = require("path");
const multer = require("multer");
const userController = require("../controllers/userController.js");
const authMiddlewares = require("../middlewares/authMiddlewares");
const db = require("../../database/models");

const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Debes completar el Mail")
    .isEmail()
    .withMessage("Debes completar un email válido"),
  check("password").notEmpty().withMessage("Debes completar el Password"),
];

//Validaciones de actualizaciones de datos del formulario de perfil

const validateUpdateUser = [
  check("name").notEmpty().withMessage("Debes ingresar un nombre"),
  check("lastName").notEmpty().withMessage("Debes ingresar un apellido"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un Email")
    .bail()
    .isEmail()
    .withMessage("Debes ingresar un formato de correo válido")
    .custom((value, { req }) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        console.log("aqui llegué");
        if (!user || user.id == req.session.user.id) {
          return true;
        }
        return Promise.reject("Este email ya está siendo utilizado");
      });
    }),
];

//Validaciones de actualizaciones de contraseña del formulario de perfil

const validateUpdatePassword = [
  check("email"),
  check("password").custom((value, {req}) => {
      return db.User.findOne({ where: { id:req.session.user.id } }).then((passFound) => {
        if (passFound && bcrypt.compareSync(value, passFound.password)) {
            return true;
          }
            return Promise.reject("La contraseña ingresada no coincide con la contraseña actual");
    })
  }),
  check("newPassword")
    .notEmpty()
    .withMessage("Debes ingresar una nueva contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Las contraseñas escritas no coinciden");
    }
    return true;
  }),
];

//Validaciones del formulario de registro

const validateCreateUser = [
  check("name").notEmpty().withMessage("Debes ingresar un nombre"),
  check("lastName").notEmpty().withMessage("Debes ingresar un apellido"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un Email")
    .bail()
    .isEmail()
    .withMessage(
      "Debes ingresar un formato de correo válido. example@example.com"
    )
    .bail()
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (!user) {
          return true;
        }
        return Promise.reject("Este email ya está siendo utilizado");
      });
    }),
  check("phone").notEmpty().withMessage("Debes ingresar un número de teléfono"),
  check("password")
    .notEmpty()
    .withMessage("Debes ingresar una contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Debes confirmar la contraseña")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(
          "Las contraseñas escritas no coinciden, inténtalo de nuevo"
        );
      }
      return true;
    }),
];

//Storage del formulario de registro

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let RouteImgProfile = path.join(__dirname, "../../public/img/profiles");
    cb(null, RouteImgProfile);
  },

  filename: (req, file, cb) => {
    let newFileNameProfile =
      "userImage-" + Date.now() + path.extname(file.originalname);
    cb(null, newFileNameProfile);
  },
});

const uploadProfile = multer({ storage: storage });

router.get(
  "/register",
  authMiddlewares.guestMiddleware,
  userController.register
);

//procesa el registro de usuario
router.post(
  "/register",
  authMiddlewares.guestMiddleware,
  uploadProfile.single("imageProfile"),
  validateCreateUser,
  userController.store
);

//procesa actualizacion datos de usuario
router.post(
  "/profile",
  authMiddlewares.authMiddleware,
  validateUpdateUser,
  userController.update
);

//procesa actualizacion datos de contraseña
router.post(
  "/changePassword",
  authMiddlewares.authMiddlewarePost,
  validateUpdatePassword,
  userController.changePassword
);

router.get(
  "/profile",
  authMiddlewares.authMiddleware, userController.profile
);

router.get(
  "/sale",
  authMiddlewares.authMiddleware, userController.sales
);

router.get(
  "/list",
  authMiddlewares.authMiddleware,
  authMiddlewares.adminMiddleware,
  userController.index
);

router.post(
  "/login",
  authMiddlewares.guestMiddleware,
  validateLogin,
  userController.login
);

router.post(
  "/logout",
  authMiddlewares.authMiddlewarePost,
  userController.logout
);

module.exports = router;
