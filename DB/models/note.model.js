import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import UserModel from './user.model.js';

const NoteModel = sequelize.define(
  'note',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER, // adjust the data type based on your User ID type
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

NoteModel.belongsTo(UserModel);

export default NoteModel;
