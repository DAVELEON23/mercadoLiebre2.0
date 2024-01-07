// ************ Require's ************
const express = require('express');
const router = express.Router();


//------------------ VALIDACIONES -----------------
const { body } = require('express-validator');

const validacionDeFormulario =[
    body("name").notEmpty().withMessage("Completa tu Nombre").bail()
    .isLength({min:3, max:12}).withMessage("Minimo 3 caracteres").bail(),

    body("lastname").notEmpty().withMessage("Completa tu Apellido").bail()
    .isLength({min:3}).withMessage("Minimo 3 caracteres").bail(),

    body("email").notEmpty().withMessage("Completa tu E-mail").bail()
    .isLength({min:3}).withMessage("Minimo 3 caracteres").bail(),
    body("password").notEmpty().withMessage('Agragar contraseña').bail(),
]

const usersController = require ("../controllers/userController")

router.get('/register',usersController.register);

router.post('/register',validacionDeFormulario, usersController.nuevoUsuario);


module.exports = router;
