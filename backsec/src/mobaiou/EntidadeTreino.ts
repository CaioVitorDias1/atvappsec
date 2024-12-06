import { DataTypes, Model } from "sequelize"
import sequelize from "../config/databaseconfig"

class EntidadeTreino extends Model {
    public id!: number
    public nome!: string
    public nomeExercicio!: string
    public repeticoes!: string
    public validade!: string

}

EntidadeTreino.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    nome: {
        type: DataTypes.STRING
    },
    nomeExercicio: {
        type: DataTypes.STRING
    },
    repeticoes: {
        type: DataTypes.STRING
    },
    validade: {
        type: DataTypes.STRING
    }
    
}, {
    sequelize, modelName: "EntidadeTreino"
})



export default EntidadeTreino