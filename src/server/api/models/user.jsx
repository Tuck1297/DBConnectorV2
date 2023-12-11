module.exports = (sequelize, DataTypes, nextAuthModels) => {
  const User = sequelize.define("user", {
    ...nextAuthModels,
    current_db_interacting: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return User;
};
