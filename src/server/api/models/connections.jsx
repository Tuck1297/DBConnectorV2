export default (sequelize, DataTypes) => {
    const Connections = sequelize.define(
      "Connections",
      {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
        host: { type: DataTypes.STRING, allowNull: false },
        port: { type: DataTypes.INTEGER, allowNull: false },
        database_name: { type: DataTypes.STRING, allowNull: false },
        schema: { type: DataTypes.STRING, allowNull: false, defaultValue: "public" },
        user_id: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        database_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "postgres" },
        current_table_interacting: { type: DataTypes.STRING, allowNull: true },
        owner_id: { type: DataTypes.UUID, allowNull: false },
    },
    );
    return Connections;
  };