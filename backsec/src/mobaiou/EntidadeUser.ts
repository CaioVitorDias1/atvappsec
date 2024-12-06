import { DataTypes, Model } from "sequelize"
import sequelize from "../config/databaseconfig"

class EntidadeUser extends Model {
    public id!: number
    public email!: string
    public senha!: string

}

EntidadeUser.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    }
    
}, {
    sequelize, modelName: "EntidadeUser"
})



export default EntidadeUser