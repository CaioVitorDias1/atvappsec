import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseconfig";
import Opcoes from "./Opcoes";

class Termos extends Model {
    public id!: number
    public listaOpcoes!: number[] 
    public versao!: number
    public textao!: number
    public listaIds!: number


public async getOpcoesTextos(): Promise<string[]> {
    const opcoes = await Opcoes.findAll({
      where: {
        id: this.listaOpcoes, // Busca opções cujos IDs estão em `listaOpcoes`
      },
    });

    return opcoes.map((opcao) => opcao.texto); // Retorna apenas os textos
  }

}

Termos.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    listaOpcoes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },

    versao: {
        type: DataTypes.INTEGER
    },
     textao: {
        type: DataTypes.STRING
     },
     listaIds: {
        type: DataTypes.INTEGER
     }
   
}, {
    sequelize, modelName: "Termos"
})


export default Termos
