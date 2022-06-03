const PlantillaModel = require("../database/models/PlantillaModel")
const UsuarioModel = require("../database/models/UsuarioModel")

const PlantillaController = {

    getAll:async(_req,res)=>{
        const plantillas = await PlantillaModel.findAll()
        res.json(plantillas)
    },

    getOne:async(req,res)=>{
        const { id } = req.query
        const plantilla = await PlantillaModel.findOne({where:{id_plantilla:id}})
        res.json(plantilla)
    },

    create: async(req,res)=>{
        const {titulo, contenido, url_imagen} = req.body
        await PlantillaModel.create({
            titulo,
            contenido,
            url_imagen
        }).then(()=>res.json('Creado'))
    },

    update: async(req,res)=>{
        const {titulo, contenido, url_imagen} = req.body
        const { id } = req.query
        await PlantillaModel.update({
            titulo,
            contenido,
            url_imagen
        }, {where:{id_plantilla:id}}).then(()=>res.json('Actualizado'))
    },

    prueba: async(req,res)=>{
        const {id_plantilla} = req.query
        const plantilla = await PlantillaModel.findOne({where:{id_plantilla}})

        const usuario = await UsuarioModel.findOne({where:{telefono_contacto:'+573209897269'}})
        
        let array = plantilla.contenido.split('&')
        
        let texto = ''
        array.forEach(el => {
            if(el==="usuario.nombre")
                el=usuario.nombres

            texto += el
        });
        res.json(texto)
    }
}

module.exports = PlantillaController