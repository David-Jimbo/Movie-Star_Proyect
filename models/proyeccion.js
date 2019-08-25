'use strict';
module.exports = (sequelize, DataTypes) => {
    const proyeccion = sequelize.define('proyeccion', {
        hora_inicio: DataTypes.STRING,
        hora_fin: DataTypes.STRING,
        fecha: DataTypes.DATEONLY,
        external_id: DataTypes.UUID,
    }, { freezeTableName: true });
    proyeccion.associate = function (models) {
        // associations can be defined here
        proyeccion.belongsTo(models.pelicula, { foreignKey: 'id_pelicula' });
        proyeccion.belongsTo(models.sala, { foreignKey: 'id_sala' });
    };
    return proyeccion;
};