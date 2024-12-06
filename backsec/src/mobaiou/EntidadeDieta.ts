import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";
import EntidadeAlimento from "./EntidadeAlimento";

class EntidadeDieta extends Model {
    public id!: number
    public nome!: string
    public nomeAlimento!: string
    public validade!: string
    public gramas!: string
    public horarios!: string


}

EntidadeDieta.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    nome: {
        type: DataTypes.STRING
    },

    validade: {
        type: DataTypes.STRING
    },
    nomeAlimento: {
        type: DataTypes.STRING
    },
    gramas: {
        type: DataTypes.STRING
    },
    horarios: {
        type: DataTypes.STRING
    },

   
    
}, {
    sequelize, modelName: "EntidadeDieta"
})

// EntidadeDieta.hasMany(EntidadeAlimento, {foreignKey: "dietaid"})
// EntidadeAlimento.belongsTo(EntidadeDieta, { foreignKey: "dietaid"})

export default EntidadeDieta