'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      New.belongsTo( models.Category, {
        foreignKey: 'categoryId',
      })
      New.hasMany( models.Comment, {
        foreignKey: 'newId',
      })
    }
  };
  New.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'New',
  });
  return New;
};