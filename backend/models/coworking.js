module.exports = (sequelize, DataTypes) => {
  const Coworking = sequelize.define(
    "Coworking",
    {
      c_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      work_time_start: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      work_time_end: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "coworking", // Указываем имя таблицы с маленькой буквы
      timestamps: false,
    }
  );

  Coworking.associate = function (models) {
    Coworking.hasMany(models.Booking, {
      foreignKey: "c_id",
      as: "bookings",
    });
  };

  return Coworking;
};
