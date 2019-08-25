'use strict';
module.exports = (sequelize, DataTypes) => {
  const sala = sequelize.define('sala', {
    nombre_sala: DataTypes.STRING,
    nro_asientos: DataTypes.INTEGER,
    external_id: DataTypes.UUID
  }, { freezeTableName: true });

  sala.associate = function (models) {
    sala.hasMany(models.horario, { foreignKey: 'id_sala', as: 'sala-horario' });
    //sala.hasMany(models.proyeccion, { foreignKey: 'id_sala', as: 'proyeccion' });
  };
  return sala;
};