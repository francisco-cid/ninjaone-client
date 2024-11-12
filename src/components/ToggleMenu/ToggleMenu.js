import "./ToggleMenu.css";
import { useState, useEffect } from "react";
import IconButton from "../IconButton/IconButton";
import { ReactComponent as ActionIcon } from "../../icons/action.svg";
const ToggleMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  // close menu when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click target is outside the menu container
      if (!event.target.closest(".menu-container")) {
        setIsOpen(false);
      }
    };

    // Add event listener to listen for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container">
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <ActionIcon />
      </IconButton>
      {isOpen && (
        <div className="dropdown-menu">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ToggleMenu;
