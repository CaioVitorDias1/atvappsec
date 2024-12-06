import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";

class HistoricoPermi extends Model {
    public id!: number
    public versao!: number
    public idDoUsuario!: number
    public termosAceitos!: Array<number>
}

HistoricoPermi.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    versao: {   
        type: DataTypes.INTEGER
    },

    idDoUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

    termosAceitosVersao: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    }
    
}, {
    sequelize, modelName: "HistoricoPermi"
})

export default HistoricoPermi