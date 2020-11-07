const { Model, DataTypes } = require("sequelize");

class Member extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      description: DataTypes.STRING,
      created_by: DataTypes.INTEGER
    },
    {
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'created_by', as: 'owner' })
    this.hasMany(models.Buy, { foreignKey: 'user_id', as: 'buys' });
  }
}

module.exports = Member;
