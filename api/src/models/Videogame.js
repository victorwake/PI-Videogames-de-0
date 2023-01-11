const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // 36 Caracteres
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The name of the game already exists',
      }
    },

    description: {
      type: DataTypes.TEXT,// Porque puede ser un texto largo
      allowNull: false,
    },

    release: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        is: {
          args: /[+]?([0-4]*\.[0-9]+|[0-5])/,// 0.0 - 5.0 permite decimales y enteros entre 0 y 5
          msg: 'The score must be between 1 to 5',// Mensaje de error
        },
      },
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    img: {
      type: DataTypes.TEXT,
  },
  },
  {
    timestamps: false,
    });
};

