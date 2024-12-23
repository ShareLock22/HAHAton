import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate для навигации

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    tg: "",
    role: false,
  });
  const [error, setError] = useState(""); // Состояние для ошибок
  const [successMessage, setSuccessMessage] = useState(""); // Состояние для уведомления об успешной регистрации
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
    setSuccessMessage(""); // Сброс уведомления об успешной регистрации

    // Логика для отправки данных на сервер (в данном случае эмулируем успешную регистрацию)
    console.log("Form Data:", formData);

    // Установим уведомление об успешной регистрации
    setSuccessMessage("Вы успешно зарегистрировались!");

    // Перенаправление на страницу входа через 2 секунды
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://ikit.sfu-kras.ru/sites/default/files/news_icons/it_acad_480x270.jpg"
          className="mx-auto h-25 w-auto"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-md p-6 bg-white shadow-lg">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Регистрация
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
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-900"
            >
              ФИО
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

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
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900"
            >
              Номер телефона
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
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
            <label
              htmlFor="tg"
              className="block text-sm font-medium text-gray-900"
            >
              Telegram
            </label>
            <div className="mt-2">
              <input
                id="tg"
                name="tg"
                type="text"
                required
                value={formData.tg}
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
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
