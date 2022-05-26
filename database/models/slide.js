'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Slide.belongsTo(models.Organization, {
        foreignKey:'organizationId'
      })
    }
  };
  Slide.init({
    imageURL: DataTypes.STRING,
    text: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Slide',
  });
  return Slide;
};
