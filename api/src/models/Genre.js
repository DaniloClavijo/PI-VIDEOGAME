const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  // no le paso un id, dejo que lo genere solo 
  sequelize.define('genre', {

    name: {
        type: DataTypes.STRING, 
        allowNull: false,
      }
  },
  {
    timestamps : false
  }
  );
};
