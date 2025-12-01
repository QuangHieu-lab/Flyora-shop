import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { getProvinces, getDistricts, getWards } from "../../api/Location";

const ShippingInfo = ({ data, onChange }) => {
  const { province, district, ward } = data;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const requesterId = storedUser?.id || storedUser?.linkedId || 1; // fallback ID = 1 nếu chưa có

  // Load provinces ban đầu
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        console.log("storedUser:", storedUser);
        console.log("requesterId:", requesterId);
        const res = await getProvinces(requesterId);
        setProvinces(res);
      } catch (err) {
        console.error("Lỗi tải tỉnh/thành:", err);
      }
    };
    fetchProvinces();
  }, []);

  // Load districts khi chọn tỉnh
  useEffect(() => {
    if (!province) {
      setDistricts([]);
      onChange({ target: { name: "district", value: "" } });
      return;
    }

    const fetchDistricts = async () => {
      try {
        const res = await getDistricts(requesterId, province);
        setDistricts(res);
        onChange({ target: { name: "district", value: "" } }); // reset district
      } catch (err) {
        console.error("Lỗi tải quận/huyện:", err);
      }
    };
    fetchDistricts();
  }, [province]);

  // Load wards khi chọn quận
  useEffect(() => {
    if (!district) {
      setWards([]);
      onChange({ target: { name: "ward", value: "" } });
      return;
    }

    const fetchWards = async () => {
      try {
        const res = await getWards(requesterId, district);
        console.log("✅ Wards:", res); // ← log ra danh sách để kiểm tra
        setWards(res);
        onChange({ target: { name: "ward", value: "" } });
      } catch (err) {
        console.error("Lỗi tải phường/xã:", err);
      }
    };
    fetchWards();
  }, [district]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

      <div className="flex items-center border-b pb-2 mb-6">
        <FaTruck className="text-green-500 text-2xl mr-2" />
        <span className="text-green-500 font-medium">Giao Hàng Tận Nơi</span>
        <MdLocationOn className="text-orange-500 text-2xl ml-auto" />
      </div>

      <div className="space-y-4">
        {/* Các input: tên, sđt, email, địa chỉ */}
        {[
          ["name", "Họ và Tên"],
          ["phone", "Số Điện Thoại"],
          ["email", "Email"],
          ["address", "Địa chỉ, tên đường"],
        ].map(([key, placeholder]) => (
          <input
            key={key}
            name={key}
            value={data[key]}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border rounded-lg px-4 py-3 placeholder-gray-400"
          />
        ))}

        {/* Tỉnh/Thành phố */}
        <select
          name="province"
          value={province}
          onChange={onChange}
          className="w-full border rounded-lg px-4 py-3 text-gray-700"
        >
          <option value="">-- Chọn Tỉnh/Thành phố --</option>
          {provinces.map((p) => (
            <option key={p.ProvinceID} value={p.ProvinceID}>
              {p.ProvinceName}
            </option>
          ))}
        </select>

        {/* Quận/Huyện */}
        <select
          name="district"
          value={district}
          onChange={onChange}
          className="w-full border rounded-lg px-4 py-3 text-gray-700"
          disabled={!province}
        >
          <option value="">-- Chọn Quận/Huyện --</option>
          {districts.map((d) => (
            <option key={d.DistrictID} value={d.DistrictID}>
              {d.DistrictName}
            </option>
          ))}
        </select>

        {/* Phường/Xã */}
        <select
          name="ward"
          value={ward}
          onChange={onChange}
          className="w-full border rounded-lg px-4 py-3 text-gray-700"
          disabled={!district}
        >
          <option value="">-- Chọn Phường/Xã --</option>
          {wards.map((w) => (
            <option key={w.WardCode} value={w.WardCode}>
              {w.WardName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShippingInfo;
