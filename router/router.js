const router = require("express").Router();

router.use('/usuario', require('./routes/UsuarioRouter'))

module.exports = router