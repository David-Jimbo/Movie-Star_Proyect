'use strict';
module.exports = (sequelize, DataTypes) => {
    const horario = sequelize.define('horario', {
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        external_id: DataTypes.UUID,
    }, { freezeTableName: true });
    horario.associate = function (models) {
        // associations can be defined here
        //horario.belongsTo(models.pelicula, { foreignKey: 'id_pelicula' });
        //horario.belongsTo(models.sala, { foreignKey: 'id_sala' });
    };
    return horario;
};