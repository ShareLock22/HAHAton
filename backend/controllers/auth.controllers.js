const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Student } = require("../models");

// Регистрация пользователя
const signup = async (req, res) => {
  try {
    const { name, mail, tg, phone, password } = req.body;

    // Проверка наличия пользователя с таким же email
    const existingStudent = await Student.findOne({ where: { mail } });
    if (existingStudent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const student = await Student.create({
      name,
      mail,
      tg,
      phone,
      password: hashedPassword,
      role: false, // Предполагаем, что роль по умолчанию false
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Вход пользователя
const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Проверка наличия пользователя с таким же email
    const student = await Student.findOne({ where: { mail } });
    if (!student) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Создание JWT токена
    const token = jwt.sign({ s_id: student.s_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Выход пользователя
const logout = (req, res) => {
  // В данном примере мы просто отправляем сообщение о выходе
  // В реальном приложении можно удалить токен из хранилища (например, из базы данных)
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  signup,
  login,
  logout,
};
