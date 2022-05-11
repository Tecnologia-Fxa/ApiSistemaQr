const LugarRegistroModel = require("../database/models/LugarRegistroModel")
const UsuarioModel = require("../database/models/UsuarioModel")
const { getPagination, getPagingData } = require("../helpers/paginationHelper")
const { Op, DATE } = require("sequelize")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")



const UsuarioController = {

    getAll: async(req,res) =>{

        const { page, size} = req.query;
        const { limit, offset } = getPagination(page, size);

        const usuarios = await UsuarioModel.findAndCountAll({
            limit,
            offset,
            include:[
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                {model:CodigoDescuentoModel, attributes:["estado"]}
            ],
            order:[['createdAt', 'DESC']]
        })

        const respuesta = getPagingData(usuarios, page, limit)

        res.json(respuesta)
    },

    getbyStateCod:async(req,res)=>{
        const { page, size, estado_code} = req.query;
        const { limit, offset } = getPagination(page, size);

        const usuarios = await UsuarioModel.findAndCountAll({
            limit,
            offset,
            include:[
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                {model:CodigoDescuentoModel, attributes:["estado"],where:{estado:estado_code}}
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
            include:[
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                {model:CodigoDescuentoModel, attributes:["estado"]}
            ],
            where:{
                [atribute]:{[getMethod(method)]:value}
            }
        })

        const respuesta = getPagingData(usuarios, page, limit)

        res.json(respuesta)
    },

    filterByDateRange: async(req,res) =>{
        let { fechaInicio, fechaFin, campo, page, size} = req.query

        const { limit, offset } = getPagination(page, size);

        const usuarios = await UsuarioModel.findAndCountAll({
            include:[
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                {model:CodigoDescuentoModel, attributes:["estado"]}
            ],
            where:{
                [campo]:{ [Op.between]:[fechaInicio,fechaFin] }
            },
            limit,
            offset,
        })
        const respuesta = getPagingData(usuarios, page, limit)
        res.json(respuesta)
    },

    update: async(req,res) =>{
        const { id_usuario } = req.query
        const { 
        nombres,
        apellidos,
        correo_electronico,
        fecha_nacimiento,
        telefono_contacto,
        numero_doc,
        lugar_registro_fk } = req.body
        
        try {
            
            await UsuarioModel.update(
                {
                nombres,
                apellidos,
                correo_electronico,
                fecha_nacimiento,
                telefono_contacto,
                numero_doc,
                lugar_registro_fk
            },
            {
                where:{id_usuario}
            }
            )
            
            
            res.json(`Usuario actualizado`)
        } catch (error) {
            res.json({error:error.message})   
        }
            
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