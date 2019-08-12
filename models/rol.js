'use strict';
module.exports = (sequelize, DataTypes) => {
  const rol = sequelize.define('rol', {
    tipo: DataTypes.STRING
  }, {});
  rol.associate = function(models) {
    // associations can be defined here
    rol.hasMany(models.persona, {foreignKey:'id_rol', as:'persona'});
  };
  return rol;
};