const CiudadModel = require("../database/models/CiudadModel")
const LugarRegistroModel = require("../database/models/LugarRegistroModel")
const PaisModel = require("../database/models/PaisModel")
const UsuarioModel = require("../database/models/UsuarioModel")
const { getPagination, getPagingData } = require("../helpers/paginationHelper")
const { Op } = require("sequelize")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")



const UsuarioController = {

    getAll: async(req,res) =>{

        const { page, size} = req.query;
        const { limit, offset } = getPagination(page, size);

        const usuarios = await UsuarioModel.findAndCountAll({
            limit,
            offset,
            attributes:["id_usuario", "nombres", "apellidos", "correo_electronico", "fecha_nacimiento", "telefono_contacto", "createdAt", "updatedAt"],
            include:[
                {model:PaisModel, attributes:["id_pais","codigo_telefonico"]},
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                {model:CiudadModel, attributes:["id_ciudad", "nombre_ciudad"]}
            ]
        })

        const respuesta = getPagingData(usuarios, page, limit)

        res.json(respuesta)
    },

    getFiltered: async(req,res) =>{
        const getMethod = (method)=>{
            switch (method) {
                case "eq":
                    return Op.eq
                
                case "ne":
                    return Op.ne

                case "substring":
                    return Op.substring
            
                default:
                    return Op.eq
            }
        }

        const { atribute, value, method, page, size } = req.query;

        const { limit, offset } = getPagination(page, size);

        const usuarios = await UsuarioModel.findAndCountAll({
            limit,
            offset,
            where:{
                [atribute]:{[getMethod(method)]:value}
            }
        })

        const respuesta = getPagingData(usuarios, page, limit)

        res.json(respuesta)
    },

    update: async(req,res) =>{
        const { id_usuario } = req.query
        const { 
        nombres,
        apellido,
        correo_electronico,
        fecha_nacimiento,
        pais_telefono_fk,
        telefono_contacto,
        lugar_registro_fk,
        ciudad_fk } = req.body
        
        await UsuarioModel.update(
            {
                nombres,
                apellido,
                correo_electronico,
                fecha_nacimiento,
                pais_telefono_fk,
                telefono_contacto,
                lugar_registro_fk,
                ciudad_fk
            },
            {
                where:{id_usuario}
            }
        )
        

        res.json(`Usuario actualizado`)

    } ,

    delete: async(req,res)=>{
        const { id_usuario } = req.query

        const {estado} = await CodigoDescuentoModel.findOne({where:{usuario_fk:id_usuario}})

        if(estado)
            res.json("No se puede eliminar a un usuario que ya a canjeado el codigo")
        else{
            await UsuarioModel.destroy({where:{id_usuario}})
            res.json("Usuario Borrado")
        }

    }

}

module.exports = UsuarioController