const { Op } = require("sequelize")
const sequelize = require("../database/ConfigBD")
const IncentivoGeneralModel = require("../database/models/IncentivoGeneralModel")
const IncentivoLugarRegistroModel = require("../database/models/IncentivoLugarRegistroModel")

const IncentivoGeneralController = {

    create: async(req, res) =>{
        const {
            titulo,
            descripcion,
            meta_incentivo,
            fecha_inicio,
            fecha_corte,
            arreglo_lugares
        } = req.body

        await IncentivoGeneralModel.create({
            titulo,
            descripcion,
            meta_incentivo,
            fecha_inicio,
            fecha_corte
        }).then(incentivoGeneralConten=>{
            let meta_a_cumplir = Math.ceil(meta_incentivo/arreglo_lugares.length)

            arreglo_lugares.forEach(async(el) => {
                IncentivoLugarRegistroModel.create({
                    lugar_registro_fk: el,
                    incentivo_general_fk: incentivoGeneralConten.id_incentivo_general,
                    meta_a_cumplir
                })
            });

            res.json('Se a creado el incentivo')
            
        }) 
    
    },

    getAll:async(req,res)=>{

        const { estado } = req.query

        let hoy = new Date()
        let incentivos
        switch (estado) {
            case "1":
                incentivos = await IncentivoGeneralModel.findAll({
                    where:{
                        fecha_inicio: {[Op.lte]:hoy},
                        fecha_corte: {[Op.gte]:hoy}
                    }
                })
                res.json(incentivos)
                break;
            case "2":
                incentivos = await IncentivoGeneralModel.findAll({
                    where:{
                        fecha_inicio: {[Op.gt]:hoy},
                    }
                })
                res.json(incentivos)
                break;
            case "3":
                incentivos = await IncentivoGeneralModel.findAll({
                    where:{
                        fecha_corte: {[Op.lt]:hoy},
                    }
                })
                res.json(incentivos)
                break;
                
            default:
                incentivos = await IncentivoGeneralModel.findAll({
                    where:{
                        fecha_inicio: {[Op.lte]:hoy},
                        fecha_corte: {[Op.gte]:hoy}
                    }
                })
                res.json(incentivos)
                break;
        }

        
    },

    consultaIncentivos:async(req,res)=>{

        const data = await sequelize.query(`
            SELECT 
                i.titulo,
                i.descripcion,
                i.fecha_inicio,
                i.fecha_corte,
                l.nombre_lugar_registro,
                i.meta_incentivo,
                i_r.meta_a_cumplir,
                case
                    when sum(u.createdAt BETWEEN i.fecha_inicio AND i.fecha_corte) is null THEN 0 
                    else sum(u.createdAt BETWEEN i.fecha_inicio AND i.fecha_corte)
                end total_usuarios
            FROM
                incentivo_lugar_registro i_r
                    LEFT JOIN
                incentivo_general i ON i_r.incentivo_general_fk = i.id_incentivo_general
                    LEFT JOIN
                lugar_registro l ON i_r.lugar_registro_fk = l.id_lugar_registro
                    LEFT JOIN
                usuario u ON u.lugar_registro_fk = l.id_lugar_registro
            GROUP BY 
                i.titulo, 
                i.descripcion, 
                i.meta_incentivo, 
                i_r.meta_a_cumplir, 
                i.fecha_inicio, 
                i.fecha_corte, 
                l.nombre_lugar_registro
        `)

        res.json(data[0])

    }

}

module.exports = IncentivoGeneralController