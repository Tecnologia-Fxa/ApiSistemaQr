const { default: axios } = require("axios");

//El archivo donde se encuentran las variables de entorno es ".env"
require ('dotenv').config();

module.exports = async(data) => {
    const respErk = await axios.post(process.env.URLCODE, data, {
        auth:{
            username:process.env.USERCODE,
            password:process.env.PASSWORDCODE
        }
    })
    return respErk.data
}