const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('platform_', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        timestamps: false,
    });
};
