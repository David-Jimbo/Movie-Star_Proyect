'use strict';
module.exports = (sequelize, DataTypes) => {
  const horario = sequelize.define('horario', {
    hora_inicio: DataTypes.DATEONLY,
    hora_fin: DataTypes.DATEONLY,
    external_id: DataTypes.UUID,
  }, {freezeTableName: true});
  horario.associate = function(models) {
    // associations can be defined here
    horario.belongsTo(models.pelicula, {foreignKey:'id_pelicula'});
  };
  return horario;
};