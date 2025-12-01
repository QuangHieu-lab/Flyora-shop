import React from "react";

const Textarea = ({
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#12a73b] focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default Textarea;
