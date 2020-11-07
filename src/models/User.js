const { Model, DataTypes } = require("sequelize");

class User extends Model{
  static init(sequelize){
    super.init({
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN
    },
    {
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Member, { foreignKey: 'created_by', as: 'members' })
    this.hasMany(models.Buy, { foreignKey: 'created_by', as: 'buys' })
  }
}

module.exports = User;
