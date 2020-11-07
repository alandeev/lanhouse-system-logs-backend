const { Model, DataTypes } = require("sequelize");

class Buy extends Model{
  static init(sequelize){
    super.init({
      user_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize
    })
  }
  static associate(models){
    this.belongsTo(models.Member, { foreignKey: 'user_id', as: 'member' })
    this.belongsTo(models.User, { foreignKey: 'created_by', as: 'owner' })
  }
}

module.exports = Buy;
