import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="bg-customGreen text-white p-4 shadow-md">
      <nav className="flex justify-center space-x-8">
        <Link to="/profile" className="hover:underline">
          Личный кабинет
        </Link>
        <Link to="/booking" className="hover:underline">
          Бронирование
        </Link>
        <Link to="/my-bookings" className="hover:underline">
          Мои бронирования
        </Link>
      </nav>
    </header>
  );
};

export default Header;
