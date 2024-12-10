CREATE TABLE Students (
    s_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    tg VARCHAR(100) UNIQUE NOT NULL,
    phone INT UNIQUE NOT NULL,
    role BOOLEAN NOT NULL
);

CREATE TABLE Coworking (
    c_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    work_time_start TIME NOT NULL,
    work_time_end TIME NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE Booking (
    b_id SERIAL PRIMARY KEY,
    s_id INT REFERENCES Students(s_id),
    c_id INT REFERENCES Coworking(c_id),
    book_date DATE NOT NULL,
    book_start TIME NOT NULL,
    book_end TIME NOT NULL,
    peoples_count INT NOT NULL
);
