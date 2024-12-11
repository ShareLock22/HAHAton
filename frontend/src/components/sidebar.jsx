import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({
  rooms,
  selectedRoom,
  handleRoomClick,
  isSidebarVisible,
  toggleSidebar,
}) => {
  return (
    <>
      {isSidebarVisible && (
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 transition-transform duration-300">
          <h2 className="text-xl font-bold mb-4">Rooms</h2>
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
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 p-2 bg-green-500 text-white rounded-full shadow-md transition duration-300"
      >
        {isSidebarVisible ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
};

export default Sidebar;
