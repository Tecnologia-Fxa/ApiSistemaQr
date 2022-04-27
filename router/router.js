const checkTokenLogin = require("../helpers/validacionLogin");

const router = require("express").Router();

router.use('/form', require('./routes/FormRouter'))

router.use('/codigo', require('./routes/CodigoDescuentoRouter'))

router.use('/usuario', checkTokenLogin, require('./routes/UsuarioRouter'))

router.use('/credencial', require('./routes/CredencialRouter'))

router.use('/lugar-registro', require('./routes/LugarRegistroRouter'))

router.use('/gen-reporte', checkTokenLogin, require('./routes/GenReporteRouter'))

module.exports = router