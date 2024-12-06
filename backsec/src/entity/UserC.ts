import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";

class Userc extends Model {
    public id!: number
    public aceitar!: boolean 
    public nome!: string
    public email!: string
    public telefone!: string
}

Userc.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    nome: {
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    aceitar: {
        type: DataTypes.BOOLEAN
    },
    
}, {
    sequelize, modelName: "Userc"
})

export default Userc