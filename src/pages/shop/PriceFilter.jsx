import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = ({ min = 15000, max = 400000, onChange }) => {
  const [priceRange, setPriceRange] = useState([min, max]);

  const handleChange = (value) => {
    setPriceRange(value);
    // Không gọi onChange ở đây
  };

  const handleApply = () => {
    if (onChange) {
      onChange(priceRange);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lọc theo giá</h2>

      <Slider
        range
        min={min}
        max={max}
        step={5000}
        defaultValue={[min, max]}
        value={priceRange}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: "#f97316" }]}
        handleStyle={[
          { borderColor: "#f97316", backgroundColor: "#f97316" },
          { borderColor: "#f97316", backgroundColor: "#f97316" },
        ]}
        railStyle={{ backgroundColor: "#e5e7eb" }}
      />
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">
          Giá: <strong>{priceRange[0].toLocaleString()} VNĐ</strong> -{" "}
          <strong>{priceRange[1].toLocaleString()} VNĐ</strong>
        </p>
        <button
          onClick={handleApply}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
