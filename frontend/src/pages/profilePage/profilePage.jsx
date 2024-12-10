import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";

export default function ProfilePage() {
  const [user, setUser] = useState({
    fullName: "John Doe",
    phone: "123-456-7890",
    email: "johndoe123@gmail.com",
    bookings: [
      {
        id: 1,
        room: "Room 1",
        date: "2023-12-10",
        startTime: "10:00",
        endTime: "12:00",
      },
      {
        id: 2,
        room: "Room 2",
        date: "2023-12-11",
        startTime: "14:00",
        endTime: "16:00",
      },
    ],
  });

  useEffect(() => {
    // Логика для загрузки данных пользователя и его бронирований из API
    // Пример:
    // fetch('/api/profile')
    //   .then(response => response.json())
    //   .then(data => setUser(data));
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-6xl">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Профиль
          </h2>
          <div className="mt-10 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Левый контейнер: Информация о пользователе */}
            <div className="bg-[#137C87] lg:w-2/3 p-6 rounded-md shadow-md border border-gray-300 text-white">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium">
                    ФИО
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={user.fullName}
                      readOnly
                      className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Номер телефона
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      value={user.phone}
                      readOnly
                      className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                    />

                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Почта
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      value={user.email}
                      readOnly
                      className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                    />

                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-white text-black px-4 py-2 rounded-md border border-gray-300">
                    Сохранить изменения
                  </button>
                </div>
              </div>
            </div>

            {/* Правый контейнер: Бронирования */}
            <div className="lg:w-2/3 p-6 bg-white rounded-md shadow-md border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900">Бронь</h3>
              <div className="mt-5 space-y-6">
                {user.bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-gray-100 rounded-md shadow-sm border border-gray-300"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">
                      {booking.room}
                    </h4>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                    <p className="text-sm text-gray-500">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">

          </div>
        </div>
      </div>
    </>
  );
}
