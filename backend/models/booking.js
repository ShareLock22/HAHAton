module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      b_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      s_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "students",
          key: "s_id",
        },
      },
      c_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "coworking",
          key: "c_id",
        },
      },
      book_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      book_start: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      book_end: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      peoples_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "booking",
      timestamps: false,
    }
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.Student, {
      foreignKey: "s_id",
      as: "student",
    });
    Booking.belongsTo(models.Coworking, {
      foreignKey: "c_id",
      as: "coworking",
    });
  };

  return Booking;
};
