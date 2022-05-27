const checkAdmin = (req,res,next)=>{
    if(req.rol === 'Admin'){
        next()
    }else{
        res.status(400).json('Accion No Permitida Para Este Rol')
    }
}

module.exports = {checkAdmin}