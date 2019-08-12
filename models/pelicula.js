'use strict';
module.exports = (sequelize, DataTypes) => {
  const pelicula = sequelize.define('pelicula', {
    nombre_peli: DataTypes.STRING,
    genero: DataTypes.STRING,
    fecha_lanzamiento: DataTypes.DATEONLY,
    edad: DataTypes.INTEGER,
    clasificacion: DataTypes.STRING,
    external_id: DataTypes.UUID,
   
  }, {freezeTableName: true});
  
  return pelicula;
};