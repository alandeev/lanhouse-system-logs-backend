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
    this.belongsTo(models.User, { foreignKey: 'created_by', as: 'Member' })
  }
}

module.exports = Member;
