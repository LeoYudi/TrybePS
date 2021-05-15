const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(connection) {
    super.init({
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      published: DataTypes.DATE,
      updated: DataTypes.DATE
    }, { sequelize: connection });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = Post;