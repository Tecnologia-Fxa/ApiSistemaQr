const sequelize = require("../database/ConfigBD")
const IncentivosModel = require("../database/models/IncentivosModel")

const IncentivosController = {

    //Funcion de creacion de un nuevo registro para incentivo
    //Retorna mensaje de exito
    create: async(req,res)=>{
        const {
            meta_incentivo,
            fecha_inicio,
            fecha_corte,
            lugar_registro_fk
        } = req.body

        IncentivosModel.create({
                meta_incentivo,
                fecha_inicio,
                fecha_corte,
                lugar_registro_fk
            }).then(()=>{
                res.json('Meta Incentivo Creada Con Exito')
            })

    },

    //Funcion que permite actualziar un registro de incentivos, se pasa el id por el cuerpo de consulta
    update:async(req,res)=>{
        const { id_incentivo } = req.query
        const {
            meta_incentivo,
            fecha_inicio,
            fecha_corte,
            lugar_registro_fk
        } = req.body

        IncentivosModel.update({
                meta_incentivo,
                fecha_inicio,
                fecha_corte,
                lugar_registro_fk
            },{
                where:{id_incentivo}
            }).then(()=>{
                res.json('Meta Incentivo actualizada Con Exito')
            })
    },

    //Metodo que consulta a la abse de datos y obtiene los incentivos y su proceso de usuarios registrados en la fecha
    //Como parametros solicita un metodo del cual varia si se consulta los incentivos antiguos, actuales o futuros
    obtenerEstadoIncentivos:async(req,res)=>{

        const {metodo} = req.query

        let condicion = ""

        switch (metodo) {
            case "1":
                 condicion = "now() between fecha_inicio and fecha_corte"
                break;
            case "2":
                condicion = "now() < fecha_inicio"
                break;
            case "3":
                condicion = "now() > fecha_corte"
                break;
        
            default:
                condicion = "now() between fecha_inicio and fecha_corte"
                break;
        }

        const resultado = await sequelize.query(`
            SELECT 
                i.id_incentivo,
                i.meta_incentivo,
                i.fecha_inicio,
                i.fecha_corte,
                lr.nombre_lugar_registro,
                case
                    when sum(u.createdAt BETWEEN i.fecha_inicio AND i.fecha_corte) is null THEN 0 
                    else sum(u.createdAt BETWEEN i.fecha_inicio AND i.fecha_corte)
                end total_usuarios
            FROM
                incentivo i
                    LEFT JOIN
                lugar_registro lr ON i.lugar_registro_fk = lr.id_lugar_registro
                    LEFT JOIN
                usuario u ON u.lugar_registro_fk = lr.id_lugar_registro
            WHERE
                ${condicion}
            GROUP BY 
                i.id_incentivo, 
                i.meta_incentivo, 
                i.fecha_inicio, 
                i.fecha_corte, 
                lr.nombre_lugar_registro;
        `)
        res.json(resultado[0])
    },

    //Metodo que elimina un registro de la  base de datos
    delete:async(req,res)=>{
        const { id_incentivo } = req.query
        IncentivosModel.destroy({where:{id_incentivo}})
        res.json('Se ha eliminado el registro')
    }

}

module.exports = IncentivosController