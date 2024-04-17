// ListView.js
import React, { useState } from "react";
import "./ListView.css";

const ListItem = ({ id, title, reserveTime, onClick, isSelected }) => {
  const styles = {
    backgroundColor: isSelected ? "rgba(71, 189, 255, 0.38)" : "transparent",
    color: isSelected ? "black" : "black",
    padding: 10,
    cursor: "pointer",
  };

  const reserveText = reserveTime !== null ? ` - Reserved` : "";

  return (
    <div className="ListItem" id={id} onClick={onClick} style={styles}>
      <div className="ListItemTitle">{title}</div>
      <div className="ListItemReserve">
        {reserveTime}
        {reserveText}
      </div>
    </div>
  );
};

const ListView = ({ items, onItemClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (title) => {
    const newItem = title === selectedItem ? null : title;
    setSelectedItem(newItem);
    onItemClick(newItem);
  };

  return (
    <div className="ListContainer">
      <ul>
        {items.map(({ index, title, reserveTime }) => (
          <li key={index}>
            <ListItem
              id={`item${index}`}
              title={title}
              reserveTime={reserveTime}
              onClick={() => handleClick(title)}
              isSelected={selectedItem === title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
