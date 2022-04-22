const CredencialModel = require("../database/models/CredencialModel")

const bcrypt = require("bcrypt")

const CredencialController = {

    logIn:async(req,res)=>{
        const { nombre_usuario, contraseña } = req.body

        const user = CredencialModel.findOne({where:{nombre_usuario}})
        if(user.nombre_usuario)
            res.json(user)
        else
            res.json("error")
    },

    createCredencials: async(_req,res)=>{
        const credenciales = await CredencialModel.findAll()

        if(credenciales[0])
        res.json("Las credenciales ya han sido creadas")
        else{
            const pass = bcrypt.hashSync("FxaPassword", 13)
            const admin = await CredencialModel.create({nombre_usuario:"Admin",contraseña:pass})
            const analista = await CredencialModel.create({nombre_usuario:"Analista",contraseña:pass})
            const tecnologia = await CredencialModel.create({nombre_usuario:"Tecnologia",contraseña:pass})
            res.json(`Se han Creado Las Credenciales para los usuarios ${admin.nombre_usuario}, ${analista.nombre_usuario} y ${tecnologia.nombre_usuario}`)
        }

    },

    changePassCredential:async(req,res)=>{
        let { contraseña, nombre_usuario, nueva_contraseña} = req.body

        const passAdmin = await CredencialModel.findOne({where:{nombre_usuario:"Admin"}})

        if(!nueva_contraseña)
            res.json("Nueva contraseña no esta definida")
        else{
            const validatePass = bcrypt.compareSync(contraseña,passAdmin.contraseña)
            
            if(!validatePass)
                res.json("Contraseña Admin Erronea")
            else{
                nueva_contraseña = bcrypt.hashSync(nueva_contraseña, 13)
                await CredencialModel.update({contraseña:nueva_contraseña},{where:{nombre_usuario}})
                res.json("Contraseña Actualizada")
            }
        }
    }

}

module.exports = CredencialController