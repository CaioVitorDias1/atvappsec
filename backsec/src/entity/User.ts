import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";
import HistoricoPermi from "./HistoricoPermi";

class User extends Model {
    public id!: number
    public nome!: string
    public email!: string
    public telefone!: string
    public senha!: string
    public acceitarTermoId!: HistoricoPermi; 
}

User.init({
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
    senha: {
        type: DataTypes.STRING
    },

    acceitarTermoId: {
        type: DataTypes.INTEGER
    }
    
}, {
    sequelize, modelName: "Users"
})

export default User