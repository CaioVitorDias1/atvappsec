import { Model, DataTypes } from "sequelize";
import sequelize from "../config/databaseconfig";

class Registro extends Model {}

Registro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    termoId: {
      type: DataTypes.INTEGER,
     
    },
    versao: {
      type: DataTypes.INTEGER,
      
    },
    opcoesAceitas: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Nome da tabela
        key: 'id',
    },
    onDelete: 'CASCADE', 

    },
  },
  {
    sequelize,
    modelName: "Registro",
    tableName: "Registros",
    timestamps: true,
  }
);

export default Registro;