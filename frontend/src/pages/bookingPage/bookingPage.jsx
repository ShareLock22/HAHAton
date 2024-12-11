import React, { useState } from "react";
import { TimeTable } from "ftr-timetable";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for sidebar toggle
import Header from "../../components/header/header";

const BookingPage = () => {
  const rooms = [
    {
      id: "1",
      name: "Сибкодинг",
      maxPeople: 10,
      bookings: [
        {
          id: "1",
          name: "Свободно",
          locationId: "1",
          startDate: "2023-12-10T10:00:00",
          endDate: "2023-12-10T12:00:00",
        },
        {
          id: "2",
          name: "Свободно",
          locationId: "1",
          startDate: "2023-12-11T14:00:00",
          endDate: "2023-12-11T16:00:00",
        },
      ],
    },
    {
      id: "2",
      name: "Шишка",
      maxPeople: 20,
      bookings: [
        {
          id: "3",
          name: "Свободно",
          locationId: "2",
          startDate: "2023-12-10T10:00:00",
          endDate: "2023-12-10T12:00:00",
        },
      ],
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [successMessage, setSuccessMessage] = useState(""); // Состояние для уведомления об успешной регистрации

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    setPeopleCount(1);
    setSuccessMessage(""); // Сброс уведомления об успешной регистрации
  };

  const handleCreateBooking = () => {
    if (peopleCount > selectedRoom.maxPeople) {
      alert(
        `Максимальное количество людей для ${selectedRoom.name} - ${selectedRoom.maxPeople}`
      );
      return;
    }
    // Logic to create booking
    console.log("Booking created:", {
      startTime: selectedItem.startDate,
      endTime: selectedItem.endDate,
      coworking: selectedRoom.name,
      peopleCount,
    });

    // Update the bookings in the selected room
    const updatedBookings = selectedRoom.bookings.map((booking) =>
      booking.id === selectedItem.id
        ? { ...booking, name: `Забронировано ${peopleCount} людьми` }
        : booking
    );

    setSelectedRoom({
      ...selectedRoom,
      bookings: updatedBookings,
    });

    closeModal();
    setSuccessMessage("Бронирование успешно создано!"); // Установим уведомление об успешной регистрации
  };

  const filterBookings = (bookings) =>
    bookings.filter((booking) => {
      const startTime = new Date(booking.startDate).getHours();
      const endTime = new Date(booking.endDate).getHours();
      return startTime >= 8 && endTime <= 22;
    });

  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* Sidebar with room selection */}
        {isSidebarVisible && (
          <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 transition-transform duration-300">
            <h2 className="text-xl font-bold mb-4">Площадки</h2>
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-2 mb-2 cursor-pointer rounded-md shadow-sm hover:bg-gray-200 ${
                  selectedRoom.id === room.id ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handleRoomClick(room)}
              >
                {room.name}
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-semibold">{selectedRoom.name}</h1>
          <p className="mb-4">
            <strong>Вместимость:</strong> {selectedRoom.maxPeople}
          </p>
          {successMessage && (
            <div className="p-4 mb-4 text-green-500 border border-green-500 rounded-md bg-green-100">
              {successMessage}
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2">Свободно</h3>
          <TimeTable
            items={filterBookings(selectedRoom.bookings)}
            locations={[{ id: selectedRoom.id, name: selectedRoom.name }]}
            variant="vertical"
            startTime="08:00"
            endTime="22:00"
            onItemClick={handleItemClick}
            styles={{
              backgroundColor: "white",
              dateBackgroundColor: "#f7f7f7",
              locationBackgroundColor: "#eaeaea",
              textColor: "#333",
              borderStyle: "solid 1px #ddd",
              itemBackgroundColor: "#137C87",
              itemHoverBackgroundColor: "#45a049",
              itemTextColor: "#fff",
            }}
          />
        </div>
        {/* Sidebar toggle button inside the sidebar */}

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Создать бронирование</h2>
              <p>
                <strong>Начало:</strong>{" "}
                {new Date(selectedItem.startDate).toLocaleString()}
              </p>
              <p>
                <strong>Конец:</strong>{" "}
                {new Date(selectedItem.endDate).toLocaleString()}
              </p>
              <p>
                <strong>Коворкинг:</strong> {selectedRoom.name}
              </p>
              <div className="mb-4">
                <label className="block text-gray-700">Количество людей:</label>
                <input
                  type="number"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  className="mt-1 p-2 border rounded w-full"
                  min="1"
                  max={selectedRoom.maxPeople}
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleCreateBooking}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
