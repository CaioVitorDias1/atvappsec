import { Sequelize } from "sequelize";


// const sequelize = new Sequelize({
//     dialect: "sqlite"
// })



const sequelize = new Sequelize('bancosakaue', 'projetopg', 'senhapg', {
    host: 'localhost', 
    dialect: 'postgres', 
    logging: false, 
});

export default sequelize