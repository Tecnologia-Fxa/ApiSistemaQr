/* Archivo que contiene el metodo de generar reporte */

//Importamos sequelize para hacer uso de una de las funciones de este objeto
const sequelize = require("../database/ConfigBD")

//Metodo que se encarga de generar un reporte de todos los usuarios segun los parametros establecidos en la consulta
const genReporte = async(req,res)=>{
    //Traemos los campos del cuerpo de la consulta
    let {campos, foraneas, condiciones, condiciones_num} = req.body

    //Definimos variables que nos seran utiles al momento de realizar la consulta en la bd
    let campo = ''
    let inners = ''
    let condicion = ''

    //recorremos el arreglo que llega en la consulta para definir que campos se quieren consultar a la bd
    campos.forEach(el => {
        //Pusheamos en la cadena de texto el elemento del arreglo
        //Ademas agregamos un espacio y una coma a la consulta... esto mediante el uso del template string
        campo += ` ${el.campo},`
    });

    //Recorremos el arrelo de foraneas para organizar una adecuada estructura en la consulta a la bd
    foraneas.forEach(el => {
        //Si el constenido del campo NO es "estado_codigo" ejecute la siguiente linea de codigo
        if(el.campo!=="estado_codigo"){
            //Pusheamos en el string de campo, el nombre de la foranea a la cual se vaa hacer relacion por ejemplo "nombre_lugar_registro"
            campo += ` nombre_${el.campo} ${el.campo},`

            //Y en la variable inners declaramos las conexiones con las otras tablas de la base de datos, para crear una relacion y traer toda la informacion requerida
            //Es un inner join normal 
            inners += ` inner join ${el.campo} on id_${el.campo} = ${el.campo}_fk`
        }else{
            //Si en dado caso el campo es "estado_codigo"
            //Solo va a pushear en campo el campo y definirlo como estado codigo
            campo += ` cod.estado Estado_Codigo,`
        }
    });

    //Al final siempre va a agregar la relacion con el codigo de descuento en un inner join 
    inners += ` inner join codigo_descuento cod on cod.usuario_fk = id_usuario`

    //Condiciones se va a agrupar en un solo arreglo
    condiciones = [...condiciones, ...condiciones_num]

    //Si existen las condiciones
    if (condiciones) {
        //Va a recorrer este arreglo treyendo el elemento y la pocicion de este
        condiciones.forEach((el, id) => {
            //Si la posicion es 0
            if(id===0){
                //Va a pushear la primera parte de la cadena como un where
                condicion += 'where '
            }else{
                //Si la pocision no es 0 va a pushear el conector and en la cadena
                condicion += ' and '
            }
            //Vamos a conertir a número el tipo 
            el.tipo = parseInt(el.tipo)
            //Si el llega a ser 1 
            if(el.tipo===1){
                //pusheara en la condicion como el campo debe tener valor
                condicion += `${el.campo} like '%${el.valor}%'`
            }else if(el.tipo===2){
                //Si llega a ser 2
                //Va a pushear como el campo foranea debe ser igual al valor dado
                condicion += `${el.campo}_fk = '${el.valor}'`
            }else if (el.tipo===3){
                //Si llega a ser 3
                //Va a pushear que el estado de codigo debe ser igual a el valor
                condicion += `cod.estado = ${el.valor}`
            }else if (el.tipo===4){
                //Si el tipo llega a ser 4
                //Va a pushear que el campo debe estar entre un valor y otro valor (si esta definido otro valor sino debe estar dentro de la misma fecha)
                condicion += `${el.campo} between '${el.valor}' and '${el.valor2?el.valor2:el.valor}'`
            }
        });    
    }

    //Quitamos el ultimo caracter para evitar errores con las comas (esto se debe que al final de cada pusheo agrega una ","")
    campo =campo.substring(0, campo.length - 1);

    //Ejecutamos la consulta y la guardamos en la variable sql
    /**
     * Esta consulta es un sub estring que desenglosa todo lo que se definio anterior mente
     * ?campo termina teniendo todos los campos a consultar en la bd
     * ?inners va a llevar las relaciones a otras tablas para traer el nombre literal de los campos y no su relacion ("FK")
     * ?condicion es el filtro de la consulta donde va a estar el where
     * Esta consulta termina teniendo una estructura similar a esta:
     * *select nombres, apellidos, nombre_lugar_registro from usuario inner join lugar_registro on lugar_registro_fk = id_lugar_registro where nombres like "%Pepe%" order by createdAT DESC
     */
    const sql = await sequelize.query(`select${campo} from usuario ${inners} ${condicion} order by createdAT DESC`) 
    //Retornamos el resultado de esta consulta
    res.json(sql[0])
}

//Exportamos esta funcion para que sea usada en el respectivo router
module.exports = genReporte