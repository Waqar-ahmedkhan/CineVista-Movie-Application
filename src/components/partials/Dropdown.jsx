import React, { useState } from "react";

const Dropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update selected option
    setIsOpen(false);
    onSelect(option); // Pass selected option back to parent component
  };

  return (
    <>
      <div className="w-full flex align-middle justify-end mr-4">
        <div className="dropdown inline-block relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span className="mr-1">{selectedOption}</span>
            <svg
              className={`fill-current h-4 w-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
            </svg>
          </button>

          {isOpen && (
            <ul className="dropdown-menu absolute text-gray-700 pt-1">
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleOptionClick(option)}
                    className={`${
                      index === 0
                        ? "rounded-t"
                        : index === options.length - 1
                        ? "rounded-b"
                        : ""
                    } bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-full whitespace-no-wrap`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
