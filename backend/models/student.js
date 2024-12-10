module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      s_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      tg: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "students",
      timestamps: false,
    }
  );

  Student.associate = function (models) {
    Student.hasMany(models.Booking, {
      foreignKey: "s_id",
      as: "bookings",
    });
  };

  return Student;
};
