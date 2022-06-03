const PlantillaModel = require("../database/models/PlantillaModel")
const UsuarioModel = require("../database/models/UsuarioModel")
const { sendSMSGeneral } = require("../helpers/sendSms")

const CampañaController = {

    prueba: async(req,res)=>{
        const {id_plantilla} = req.query
        const { usuarios } = req.body

        const plantilla = await PlantillaModel.findOne({where:{id_plantilla}})

        let prueba = []
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
                
                sendSMSGeneral(el.telefono_contacto,texto)
            } catch (error) {
                console.log("Ocurrio un error y no se envio el mensaje a:"+el.telefono_contacto)
            }
        })
        
        res.json('Se ha generado la campaña')
        
    }
}

module.exports = CampañaController