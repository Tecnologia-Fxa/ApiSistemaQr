
require('dotenv').config();

const jwt = require("jwt-simple")

const checkTokenServer = (req,res,next)=>{
    if (!req.headers['token-server']) {
        return  res.status(401).json({error: "Necesitas Incluir El Token De Acceso Para Acceder A Esta Función"});
    }

    const tokenCredencial = req.headers['token-server'];
    
    let payload = {};
    
    try {
        payload = jwt.decode(tokenCredencial, process.env.PASSDECODE);
    } catch (e) {
        return  res.status(401).json({error:'Token Invalido'});
    }

    next();
}

module.exports = checkTokenServer