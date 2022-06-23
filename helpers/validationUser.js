/* Archivo que contiene el metodo que valida si el que ejecuta una determinada accion es el rol admin */

//Metodo de req,res,next para que cuando termine de validar o de una respuesta o siga a la siguiente funcion
const checkAdmin = (req,res,next)=>{
    //Si el parametro denominado como rol es "Admin"
    if(req.rol === 'Admin'){
        //Ejecute el flujo de manera normal
        next()
    }else{
        //Si no retorne estado de error y mensaje de error
        res.status(400).json('Accion No Permitida Para Este Rol')
    }
}

//Exportamos el metodo para hacer uso de este en otra parte del codigo
module.exports = {checkAdmin}