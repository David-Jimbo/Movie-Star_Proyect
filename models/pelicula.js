'use strict';
module.exports = (sequelize, DataTypes) => {
  const pelicula = sequelize.define('pelicula', {
    portada:DataTypes.STRING,
    nombre_peli: DataTypes.STRING,
    genero: DataTypes.STRING,
    fecha_lanzamiento: DataTypes.DATEONLY,
    sinopsis: DataTypes.STRING,
    clasificacion: DataTypes.STRING,
    duracion: DataTypes.INTEGER,
    director: DataTypes.STRING,
    protagonistas:DataTypes.STRING,
    external_id: DataTypes.UUID,
    trailer: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
   
  }, {freezeTableName: true});

  pelicula.associate = function (models) {
    pelicula.hasMany(models.horario, { foreignKey: 'id_pelicula', as: 'horario' });
    //pelicula.hasMany(models.proyeccion, { foreignKey: 'id_pelicula', as: 'proyeccion' });
  };
  return pelicula;
};