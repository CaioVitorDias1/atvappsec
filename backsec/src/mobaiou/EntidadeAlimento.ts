import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";
import EntidadeDieta from "./EntidadeDieta";

class EntidadeAlimento extends Model {
    public id!: number
    public name!: string
}

EntidadeAlimento.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    nome: {
        type: DataTypes.STRING
    },
    quantidade: {
        type: DataTypes.STRING
    },
    horario: {
        type: DataTypes.STRING
    },
    
}, {
    sequelize, modelName: "EntidadeAlimento"
})



export default EntidadeAlimento