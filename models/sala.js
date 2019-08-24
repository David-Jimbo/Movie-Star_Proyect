'use strict';
module.exports = (sequelize, DataTypes) => {
  const sala = sequelize.define('sala', {
    nombre_sala: DataTypes.STRING,
    nro_asientos: DataTypes.INTEGER,
    estado:DataTypes.BOOLEAN,
    external_id: DataTypes.UUID
  }, { freezeTableName: true });

  sala.associate = function (models) {
    sala.hasMany(models.horario, { foreignKey: 'id_sala', as: 'sala-horario' });
  };
  return sala;
};