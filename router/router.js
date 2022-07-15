/* Archivo que contiene todas las redirecciones dependiendo la ruta */

//Importamos metodo de validacion de logueo en el sistema
const checkTokenLogin = require("../helpers/validacionLogin");

//Importamos router de expres para que este redireccione o ejecute funciones seun corresponda
const router = require("express").Router();

//Cuando la ruta sea "/form" va a dirigirse a la siguiente carpeta
router.use('/form', require('./routes/FormRouter'))

//Cuando la ruta sea "/codigo" va a dirigirse a la siguiente carpeta
router.use('/codigo', require('./routes/CodigoDescuentoRouter'))

//Cuando la ruta sea "/usuario" va a validar que exista un logueo en el api, y despues va a dirigirse a la siguiente carpeta
router.use('/usuario', checkTokenLogin, require('./routes/UsuarioRouter'))

//Cuando la ruta sea "/credencial" va a dirigirse a la siguiente carpeta
router.use('/credencial', require('./routes/CredencialRouter'))

//Cuando la ruta sea "/lugar-registro" va a dirigirse a la siguiente carpeta
router.use('/lugar-registro', require('./routes/LugarRegistroRouter'))

//Cuando la ruta sea "/gen-reporte" va a validar que exista un logueo en el api, y despues va a dirigirse a la siguiente carpeta
router.use('/gen-reporte', checkTokenLogin, require('./routes/GenReporteRouter'))

//Cuando la ruta sea "/data-dash" va a validar que exista un logueo en el api, y despues va a dirigirse a la siguiente carpeta
router.use('/data-dash', checkTokenLogin, require('./routes/DashBoardDataRouter'))

//Cuando la ruta sea "/visit-counter" va a dirigirse a la siguiente carpeta
router.use('/visit-counter', require('./routes/ViewsCounterRouter'))

//Cuando la ruta sea "/birthday" va a validar que exista un logueo en el api, y despues va a dirigirse a la siguiente carpeta
router.use('/birthday', checkTokenLogin, require('./routes/CumpleañosRouter'))

//Cuando la ruta sea "/plantilla" va a validar que exista un logueo en el api, y despues va a dirigirse a la siguiente carpeta
router.use('/plantilla', checkTokenLogin, require('./routes/PlanillaRouter'))

//Cuando la ruta sea "/campana" va a validar que exista un logueo en el api, y despues va a dirigirse a la siguiente carpeta
router.use('/campana', checkTokenLogin, require('./routes/CampañaRouter'))

router.use('/incentivo-general', require('./routes/IncentivoGeneralRouter'))

//Exportamos el router para que sea usado en otra parte del codigo
module.exports = router