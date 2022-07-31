const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: { // id
      type: DataTypes.UUID,
      defaultValue :DataTypes.UUIDV4,
      allowNull: false, // campo obligatorio
      primaryKey : true
    },
    name: { // nombre 
      type: DataTypes.STRING,
      allowNull: false, //campo obligatorio
    },
    description: { // descripcion
      type : DataTypes.TEXT,
      allowNull : false
    },  
    released: { // fecha de lanzamiento
      type : DataTypes.STRING,
      allowNull : true
    },
    rating: { // Rating
      type: DataTypes.DECIMAL
    },
    image: {
      type: DataTypes.TEXT
    },
    platforms: { // plataforma
      type:DataTypes.JSON,
      allowNull: true
    },
    createdInDb: { // creado en database 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

  },
  {
    timestamps: false,
  }
  );
};
