import React from "react";
import { TimeTable } from "ftr-timetable";

const BookingPage = () => {
  const locations = [
    { id: "1", name: "Room 1" },
    { id: "2", name: "Room 2" },
  ];

  const items = [
    {
      id: "1",
      name: "Booked by John Doe",
      locationId: "1",
      startDate: "2023-12-10T10:00:00",
      endDate: "2023-12-10T12:00:00",
    },
    {
      id: "2",
      name: "Booked by Jane Smith",
      locationId: "1",
      startDate: "2023-12-11T14:00:00",
      endDate: "2023-12-11T16:00:00",
    },
    {
      id: "3",
      name: "Booked by Alice Johnson",
      locationId: "2",
      startDate: "2023-12-10T10:00:00",
      endDate: "2023-12-10T12:00:00",
    },
  ];

  const handleItemClick = (item) => {
    alert(`Clicked on event: ${item.name}`);
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <TimeTable
        items={items}
        locations={locations}
        variant="horizontal" // или "vertical", в зависимости от предпочтений
        onItemClick={handleItemClick}
        styles={{
          backgroundColor: "white",
          dateBackgroundColor: "#f7f7f7",
          locationBackgroundColor: "#eaeaea",
          textColor: "#333",
          borderStyle: "solid 1px #ddd",
          itemBackgroundColor: "#4caf50",
          itemHoverBackgroundColor: "#45a049",
          itemTextColor: "#fff",
        }}
      />
    </div>
  );
};

export default BookingPage;
