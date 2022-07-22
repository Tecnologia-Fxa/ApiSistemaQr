const { Op } = require("sequelize")
const sequelize = require("../database/ConfigBD")
const IncentivoGeneralModel = require("../database/models/IncentivoGeneralModel")
const IncentivoLugarRegistroModel = require("../database/models/IncentivoLugarRegistroModel")

const IncentivoGeneralController = {

    
    create: async(req, res) =>{
        let {
            titulo,
            descripcion,
            meta_incentivo,
            fecha_inicio,
            fecha_corte,
            arreglo_lugares_meta_definida,
            arreglo_lugares
        } = req.body

        await IncentivoGeneralModel.create({
            titulo,
            descripcion,
            meta_incentivo,
            fecha_inicio,
            fecha_corte
        }).then(incentivoGeneralConten=>{

            if(arreglo_lugares_meta_definida[0]){
                arreglo_lugares_meta_definida.forEach(el => {
                    meta_incentivo -= el.meta_a_cumplir
                    
                    IncentivoLugarRegistroModel.create({
                        lugar_registro_fk: el.lugar_registro_fk,
                        incentivo_general_fk: incentivoGeneralConten.id_incentivo_general,
                        meta_a_cumplir:el.meta_a_cumplir
                    })
                });
            }

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

    update: async(req,res)=>{
        const {id_incentivo_general, tipo_update} = req.query
        let {
            titulo,
            descripcion,
            meta_incentivo,
            fecha_inicio,
            fecha_corte,
            arreglo_lugares_meta_definida,
            arreglo_lugares
        } = req.body

        await IncentivoGeneralModel.update({
            titulo,
            descripcion,
            meta_incentivo,
            fecha_inicio,
            fecha_corte
        },{
            where:{id_incentivo_general}
        }).then(()=>{
            
            if(tipo_update === "1"){
                res.json("Incentivo actualizado con exito")
            }else{

                IncentivoLugarRegistroModel.destroy({where:{incentivo_general_fk:id_incentivo_general}}).then(()=>{
                    if(arreglo_lugares_meta_definida[0]){
                        arreglo_lugares_meta_definida.forEach(el => {
                            meta_incentivo -= el.meta_a_cumplir
                            
                            IncentivoLugarRegistroModel.create({
                                lugar_registro_fk: el.lugar_registro_fk,
                                incentivo_general_fk: id_incentivo_general,
                                meta_a_cumplir:el.meta_a_cumplir
                            })
                        });
                    }
    
                    let meta_a_cumplir = Math.ceil(meta_incentivo/arreglo_lugares.length)
    
                    arreglo_lugares.forEach(async(el) => {
                        IncentivoLugarRegistroModel.create({
                            lugar_registro_fk: el,
                            incentivo_general_fk: id_incentivo_general,
                            meta_a_cumplir
                        })
                    });
                    res.json("Incentivo actualizado con exito")
                })
            }
        })
    },

    updateIncentivoLugarRegistro:async(req,res)=>{

        const {
            lugar_registro_fk,
            incentivo_general_fk,
            meta_a_cumplir
        } = req.body

        IncentivoLugarRegistroModel.update(
            {
                meta_a_cumplir
            },
            {
                where:{
                    lugar_registro_fk,
                    incentivo_general_fk
                }
            }
        ).then(()=>{
            res.json('Incentivo Actualizado')
        })

    },

    delete:async(req,res)=>{
        const {id_incentivo_general} = req.query
        await IncentivoGeneralModel.destroy({where:{id_incentivo_general}})
        await IncentivoLugarRegistroModel.destroy({where:{incentivo_general_fk:id_incentivo_general}})
        res.json('Se han eliminado los registros')
    },

    getAll:async(req,res)=>{

        const { estado } = req.query

        let condicion
        switch (estado) {
            case "1":
                condicion = "NOW() BETWEEN i.fecha_inicio and i.fecha_corte "
                break;
            case "2":
                condicion = "i.fecha_corte < NOW()"
                break;
            case "3":
                condicion = "i.fecha_inicio > NOW()"
                break;
                
            default:
                condicion = "NOW() BETWEEN i.fecha_inicio and i.fecha_corte "
                break;
        }

        const [data, _setings] = await sequelize.query(`
            SELECT 
                i.*,
                SUM(createdAt BETWEEN i.fecha_inicio AND i.fecha_corte) total_registros
            FROM
                incentivo_lugar_registro i_l
                    LEFT JOIN
                incentivo_general i ON i_l.incentivo_general_fk = i.id_incentivo_general
                    LEFT JOIN
                lugar_registro l ON i_l.lugar_registro_fk = l.id_lugar_registro
                    LEFT JOIN
                usuario u ON u.lugar_registro_fk = l.id_lugar_registro
            WHERE
                ${condicion}
            GROUP BY i.id_incentivo_general;
        `)

        res.json(data)

    },

    consultaIncentivos:async(req,res)=>{

        let {id_incentivo_general} = req.query

        !id_incentivo_general?id_incentivo_general=1:id_incentivo_general

        const data = await sequelize.query(`
        SELECT 
            l.id_lugar_registro,
            l.nombre_lugar_registro,
            i_r.meta_a_cumplir,
            case
                when sum(u.createdAt BETWEEN i.fecha_inicio AND i.fecha_corte) is null THEN 0 
                else sum(u.createdAt BETWEEN i.fecha_inicio AND i.fecha_corte)
            end total_registros
        FROM
            incentivo_lugar_registro i_r
                LEFT JOIN
            incentivo_general i ON i_r.incentivo_general_fk = i.id_incentivo_general
                LEFT JOIN
            lugar_registro l ON i_r.lugar_registro_fk = l.id_lugar_registro
                LEFT JOIN
            usuario u ON u.lugar_registro_fk = l.id_lugar_registro
        WHERE
            i.id_incentivo_general = 1
        GROUP BY 
            l.id_lugar_registro,
            l.nombre_lugar_registro
        ORDER BY 
            l.nombre_lugar_registro;
        `)

        res.json(data[0])

    }

}

module.exports = IncentivoGeneralController