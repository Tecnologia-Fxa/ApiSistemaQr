/* Archivo que contiene los metodos que son usados para generar la paginacion en las consultas de usuarios */

  //Funcion que retorna el inicio de la consulta y el final de la misma
  //Como parametros solicita la pagina y el tamaño de la pagina
  const getPagination = (page, size) => {

    //Se define el limite como el tamaño de la pagina, si no esta definido este limite es de 50
    const limit = size ? +size : 50;

    //Se define el inicio, o las lineas que va a saltar, si la pagina esta definida el inicio va a ser la pagina por el limite, si no sera 0
    const offset = page ? page * limit : 0;
  
    //Retornamos El limite y el inicio
    return { limit, offset };
  };
  
  //FUncion que obtiene y organiza la informacion retornada por la consulta
  //Como parametros requiere la informacion, la pagina y el limite
  const getPagingData = (data, page, limit) => {
    //De la data se obtienen el total de items y los registros
    const { count: totalItems, rows } = data;
    //Se define la pagina actual como el valor que tiene page y si no esta definido sera 0
    const currentPage = page ? +page : 0;
    //Se definen el total de paginas como el resultado de el total de items y el limite
    const totalPages = Math.ceil(totalItems / limit);
    //Retorna un objeto con las variables definidas anterior mente
    return { totalItems, rows, totalPages, currentPage };
  };
  
  //Exportamos estas funciones para usarlas en otras partes del codigo
  module.exports = {
      getPagination,
      getPagingData
  }