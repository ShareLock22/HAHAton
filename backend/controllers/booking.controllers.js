const { Booking, Coworking, Student } = require("../models");
const { Op } = require("sequelize");

// Создание бронирования
const createBooking = async (req, res) => {
  try {
    const {
      s_id,
      c_id,
      book_date,
      book_start_time,
      book_end_time,
      peoples_count,
    } = req.body;

    // Проверка наличия студента и коворкинга
    const student = await Student.findByPk(s_id);
    if (!student) {
      return res.status(400).json({ error: "Student not found" });
    }

    const coworking = await Coworking.findByPk(c_id);
    if (!coworking) {
      return res.status(400).json({ error: "Coworking not found" });
    }

    // Проверка доступности времени
    const existingBookings = await Booking.findAll({
      where: {
        c_id,
        book_date,
        [Op.or]: [
          {
            book_start_time: { [Op.lt]: book_end_time },
            book_end_time: { [Op.gt]: book_start_time },
          },
          {
            book_start_time: {
              [Op.between]: [book_start_time, book_end_time],
            },
          },
          {
            book_end_time: {
              [Op.between]: [book_start_time, book_end_time],
            },
          },
        ],
      },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    // Создание бронирования
    const booking = await Booking.create({
      s_id,
      c_id,
      book_date,
      book_start_time,
      book_end_time,
      peoples_count,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Получение всех бронирований
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Student, as: "student" },
        { model: Coworking, as: "coworking" },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Получение бронирования по ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [
        { model: Student, as: "student" },
        { model: Coworking, as: "coworking" },
      ],
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Обновление бронирования
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      s_id,
      c_id,
      book_date,
      book_start_time,
      book_end_time,
      peoples_count,
    } = req.body;

    // Проверка наличия студента и коворкинга
    const student = await Student.findByPk(s_id);
    if (!student) {
      return res.status(400).json({ error: "Student not found" });
    }

    const coworking = await Coworking.findByPk(c_id);
    if (!coworking) {
      return res.status(400).json({ error: "Coworking not found" });
    }

    // Проверка доступности времени
    const existingBookings = await Booking.findAll({
      where: {
        c_id,
        book_date,
        [Op.or]: [
          {
            book_start_time: { [Op.lt]: book_end_time },
            book_end_time: { [Op.gt]: book_start_time },
          },
          {
            book_start_time: {
              [Op.between]: [book_start_time, book_end_time],
            },
          },
          {
            book_end_time: {
              [Op.between]: [book_start_time, book_end_time],
            },
          },
        ],
        b_id: { [Op.ne]: id }, // Исключаем текущее бронирование из проверки
      },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    // Обновление бронирования
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.s_id = s_id;
    booking.c_id = c_id;
    booking.book_date = book_date;
    booking.book_start_time = book_start_time;
    booking.book_end_time = book_end_time;
    booking.peoples_count = peoples_count;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Удаление бронирования
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.destroy();
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
