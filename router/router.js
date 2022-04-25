const checkTokenLogin = require("../helpers/validacionLogin");
const DefaultQueryRouter = require("./routes/DefaultQueryRouter");

const router = require("express").Router();

router.use('/form', require('./routes/FormRouter'))

router.use('/codigo', require('./routes/CodigoDescuentoRouter'))

router.use('/usuario', checkTokenLogin, require('./routes/UsuarioRouter'))

router.use('/credencial', require('./routes/CredencialRouter'))

router.use('/lugar-registro', require('./routes/LugarRegistroRouter'))

router.use('/gen-reporte', require('./routes/GenReporteRouter'))

//?_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

router.use('/ciudad', DefaultQueryRouter("CiudadModel", "estado_fk"))
router.use('/estado', DefaultQueryRouter("EstadoModel", "pais_fk"))
router.use('/pais', DefaultQueryRouter("PaisModel", "id_pais"))
router.use('/pais', require('./routes/DataPaisEstadoCiudadRouter'))

module.exports = router