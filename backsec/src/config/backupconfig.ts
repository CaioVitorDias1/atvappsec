import { Sequelize } from "sequelize";


// const sequelize = new Sequelize({
//     dialect: "sqlite"
// })



const sequelize2 = new Sequelize('bancoBackup', 'projetopg', 'senhapg', {
    host: 'localhost', 
    dialect: 'postgres', 
    logging: false, 
});

export default sequelize2