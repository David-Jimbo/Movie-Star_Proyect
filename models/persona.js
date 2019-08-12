'use strict';
module.exports = (sequelize, DataTypes) => {
  const persona = sequelize.define('persona', {
    cedula: DataTypes.STRING,
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    fecha_nac: DataTypes.DATEONLY,
    external_id: DataTypes.UUID
  }, {freezeTableName: true});
  persona.associate = function(models) {
    // associations can be defined here
    persona.hasOne(models.cuenta, {foreignKey:'id_persona', as:'cuenta'});
    persona.belongsTo(models.rol, {foreignKey:'id_rol'});
  };
  return persona;
};