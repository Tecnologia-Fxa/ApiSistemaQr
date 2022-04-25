const sequelize = require("../database/ConfigBD")

const genReporte = async(req,res)=>{
    let {campos, foraneas, condiciones, condiciones_num} = req.body
    let campo = ''
    let inners = ''
    let condicion = ''

    campos.forEach(el => {
        campo += ` ${el.campo},`
    });


    foraneas.forEach(el => {
        if(el.campo!=="estado_codigo"){
            campo += ` nombre_${el.campo} ${el.campo},`
            inners += ` inner join ${el.campo} on id_${el.campo} = ${el.campo}_fk`
        }else{
            campo += ` cod.estado Estado_Codigo,`
            inners += ` inner join codigo_descuento cod on cod.usuario_fk = id_usuario`
        }
    });

    condiciones = [...condiciones, ...condiciones_num]

    if (condiciones) {
        condiciones.forEach((el, id) => {
            if(id===0){
                condicion += 'where '
            }else{
                condicion += ' and '
            }
            el.tipo = parseInt(el.tipo)
            if(el.tipo===1){
                condicion += `${el.campo} = '${el.valor}'`
            }else if(el.tipo===2){
                condicion += `${el.campo}_fk = '${el.valor}'`
            }else if (el.tipo===3){
                condicion += `cod.estado = ${el.valor}`
            }else if (el.tipo===4){
                condicion += `${el.campo} between '${el.valor}' and '${el.valor2?el.valor2:el.valor}'`
            }
        });    
    }

    campo =campo.substring(0, campo.length - 1);
    const sql = await sequelize.query(`select${campo} from usuario ${inners} ${condicion}`) 
    res.json(sql[0])
}

module.exports = genReporte