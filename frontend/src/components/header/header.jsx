import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#137C87] to-[#106772] text-white p-6 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src="https://sh-osinskaya-r138.gosweb.gosuslugi.ru/netcat_files/228/3572/free_icon_coworking_1965773.png"
          alt="Logo"
          className="h-12 w-auto"
        />
      </div>
      <nav className="flex space-x-8">
        <Link to="/profile" className="text-white hover:text-yellow-300 hover:underline transition duration-300">
          Личный кабинет
        </Link>
        <Link to="/booking" className="text-white hover:text-yellow-300 hover:underline transition duration-300">
          Бронирование
        </Link>
        <Link to="/login" className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/?size=100&id=2445&format=png&color=FFFFFF"
            alt="Login Icon"
            className="h-7 w-auto"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
