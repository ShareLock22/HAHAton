import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для отправки данных на сервер
    if (email === "user@example.com" && password === "password") {
      setError("");
      alert("Успешная авторизация!");
    } else {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="login-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
