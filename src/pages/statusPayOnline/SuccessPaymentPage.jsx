import React from "react";

const SuccessPaymentPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-md w-full bg-white border border-green-200 rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Thanh Toán Thành Công!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được thanh toán thành
          công.
        </p>
        <a
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
        >
          Quay về Trang chủ
        </a>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
