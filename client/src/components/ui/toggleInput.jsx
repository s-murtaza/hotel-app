import { useState } from "react";

const RadioButton = ({ labelName, selectedFilter, onFilterChange }) => {
  let [open, setOpen] = useState(false);

  return (
    <label className="relative flex items-center cursor-pointer m-0.5">
      <input
        type="radio"
        id={`radio-${labelName}`}
        value={labelName}
        checked={selectedFilter === labelName}
        onChange={onFilterChange}
        className="sr-only"
      />
      <span
        className={`block w-4 h-4 rounded-full border-2 border-gray-300 ${
          selectedFilter === labelName ? "bg-orange-950" : "bg-white"
        }`}
      />
      <span className="ml-3 text-sm text-gray-700">{labelName}</span>
    </label>
  );
};

export default RadioButton;
