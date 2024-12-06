import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";

class Opcoes extends Model {
    public id!: number
    public texto!: string 
    public obrigatorio!: boolean
}

Opcoes.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    texto: {
        type: DataTypes.STRING
    },

    obrigatorio: {
        type: DataTypes.BOOLEAN
    }
   
}, {
    sequelize, modelName: "Opcoes"
})

export default Opcoes