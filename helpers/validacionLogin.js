require('dotenv').config();

const jwt = require("jwt-simple")
const moment = require("moment")

const checkTokenLogin = (req,res,next)=>{
    if (!req.headers['token-login']) {
        return  res.status(401).json({error: "Necesitas iniciar sesión para acceder a este contenido a"});
    }

    const tokenCredencial = req.headers['token-login'];
    
    let payload = {};
    
    try {
        payload = jwt.decode(tokenCredencial, process.env.PASSDECODE);
    } catch (e) {
        return  res.status(401).json({error:'Necesitas iniciar sesión para acceder a este contenido b'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.status(408).json({error:`El tiempo limite de uso en la pagina a caducado, por favor vuelva a iniciar sesión`});
    }

    next();
}

module.exports = checkTokenLogin