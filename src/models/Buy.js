const { Model, DataTypes } = require("sequelize");

class Buy extends Model{
  static init(sequelize){
    super.init({
      user_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      type: DataTypes.BOOLEAN
    },
    {
      sequelize
    })
  }
  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'Member' })
    this.belongsTo(models.User, { foreignKey: 'created_by', as: 'Owner' })
  }
}

module.exports = Buy;
