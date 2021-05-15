const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    }, { sequelize: connection });
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  }
}

module.exports = User;