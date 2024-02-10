import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('DB', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize.sync()
const dbConn = async () => {
  try {
    const result = await sequelize.sync({ alter: true, force: true });
    console.log('Connection has been established successfully.', result);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConn;
