'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association herew
      Comment.belongsTo( models.User, {
        foreignKey:'userId'
      })
      Comment.belongsTo( models.New, {
        foreignKey:'newId'
      })
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    newId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};