import {Sequelize} from "sequelize"

const connectDb = async ()=>{
    try {
        const sequelize= new Sequelize(process.env.DATABASE_URL,{
            host: "localhost",
            dialect: 'postgresql',
            logging: false,
        })
        await sequelize.authenticate()
        return sequelize;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export {
    connectDb,
}