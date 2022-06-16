const CampañaModel = require("../database/models/CampañaModel")
const CampañaUsuarioModel = require("../database/models/CampañaUsuarioModel")
const PlantillaModel = require("../database/models/PlantillaModel")
const UsuarioModel = require("../database/models/UsuarioModel")
const { enviarCorreo } = require("../helpers/SendEmail")
const { sendSMSGeneral } = require("../helpers/sendSms")

const CampañaController = {

    new: async(req,res)=>{
        const {id_plantilla} = req.query
        const { usuarios, nombre_campaña, fecha_publicacion, metodo } = req.body

        const plantilla = await PlantillaModel.findOne({where:{id_plantilla}})

        const arregloMetodo = metodo.split(',')
        console.log(arregloMetodo)

        const campañaCreada = await CampañaModel.create({
            nombre_campaña,
            fecha_publicacion,
            metodo,
            plantilla_fk: id_plantilla,
            credencial_fk: req.id_rol
        })

        

        usuarios.forEach(async(el) => {
            try {
                const usuario = await UsuarioModel.findOne({where:{telefono_contacto:el.telefono_contacto}})
                let array = plantilla.contenido.split('&')
                
                let texto = ''
                array.forEach(el => {
                    if(el==="usuario.nombre")
                        el=usuario.nombres
        
                    texto += el
                });
                
                await CampañaUsuarioModel.create({
                    usuario_fk:usuario.id_usuario,
                    campaña_fk:campañaCreada.id_campaña
                })

                if(arregloMetodo.includes('1'))
                    sendSMSGeneral(usuario.telefono_contacto,texto)

                if(arregloMetodo.includes('2'))
                    enviarCorreo(usuario.correo_electronico, plantilla.titulo, texto)

            } catch (error) {
                console.log("Ocurrio un error y no se envio el mensaje a:"+el.telefono_contacto)
            }
        })
        
        
        res.json('Se ha generado la campaña')
        
    }
}

module.exports = CampañaController