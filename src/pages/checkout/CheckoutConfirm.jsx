import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutConfirm = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || "Không có mã đơn hàng";
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
        <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Đặt Hàng Thành Công</h2>
        <p className="mb-6">Mã Đơn Hàng</p>
        <p className="text-lg font-semibold mb-6">{orderId}</p>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Tiếp Tục Mua Hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutConfirm;
