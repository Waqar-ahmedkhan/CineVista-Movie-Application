import React from "react";

const DropDown1 = ({ options, title, func }) => {
  return (
    <div className="select">
      <select onChange={func} name="format" id="format">
        <option value="" disabled hidden>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown1;
