import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate для навигации
import users from "../../data/data"; // Импортируем локальную базу пользователей

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Состояние для ошибок
  const [successMessage, setSuccessMessage] = useState(""); // Состояние для уведомления об успешном входе
  const navigate = useNavigate(); // Используем useNavigate для навигации

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Сброс ошибок
    setSuccessMessage(""); // Сброс уведомления об успешном входе

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError("Неверный email или пароль");
      return;
    }

    // Сохраните токен в localStorage или другом хранилище
    localStorage.setItem("token", user.id);

    // Установим уведомление об успешном входе
    setSuccessMessage("Вы успешно вошли в систему!");

    // Перенаправление на страницу бронирования через 2 секунды
    setTimeout(() => {
      navigate("/booking");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col justify-start items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
        <img
          alt="Your Company"
          src="https://ikit.sfu-kras.ru/sites/default/files/news_icons/it_acad_480x270.jpg"
          className="mx-auto h-25 w-auto"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-md p-6 bg-white shadow-lg">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 pb-5">
          Войдите в свой аккаунт
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <div className="p-4 mb-4 text-green-500 border border-green-500 rounded-md bg-green-100">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Почта
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Пароль
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#137C87] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#106772] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C87]"
            >
              Войти
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-[#137C87] hover:underline">
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  );
}
