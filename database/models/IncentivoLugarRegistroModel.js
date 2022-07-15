
const { Model, DataTypes} = require('sequelize');

const sequelize = require('../ConfigBD');

class IncentivoLugarRegistroModel extends Model {};

IncentivoLugarRegistroModel.init({

    lugar_registro_fk:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    incentivo_general_fk:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    meta_a_cumplir:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'incentivo_lugar_registro',
    timestamps:false,
    freezeTableName: true
});

module.exports = IncentivoLugarRegistroModel