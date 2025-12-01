import React, { useEffect, useState } from "react";

const CancelPaymentPage = () => {
  const [statusMessage, setStatusMessage] = useState(
    "Đang xử lý hủy đơn hàng..."
  );
  const [statusType, setStatusType] = useState("loading");

  useEffect(() => {
    const cancelOrder = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderCode = params.get("orderCode");

      console.log("orderCode in URL:", orderCode);

      if (!orderCode) {
        setStatusType("error");
        setStatusMessage("Thiếu orderCode trong URL.");
        return;
      }

      try {
        const response = await fetch(
          `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/payment/cancel?orderCode=${orderCode}`
        );
        const result = await response.json();

        console.log("API response:", result);

        if (response.ok && result.status === "CANCELLED") {
          setStatusType("success");
          setStatusMessage(`Đã hủy đơn hàng #${result.orderCode}.`);
        } else if (result.status === "PAID") {
          setStatusType("warning");
          setStatusMessage("Đơn hàng đã được thanh toán, không thể hủy.");
        } else {
          setStatusType("error");
          setStatusMessage(
            `Không thể hủy đơn hàng: ${result.message || "Không xác định"}`
          );
        }
      } catch (error) {
        console.error("Lỗi fetch:", error);
        setStatusType("error");
        setStatusMessage("Lỗi hệ thống khi xử lý yêu cầu.");
      }
    };

    cancelOrder();
  }, []);

  const getStatusStyle = () => {
    switch (statusType) {
      case "success":
        return "text-green-600 border-green-200 bg-green-50";
      case "error":
        return "text-red-600 border-red-200 bg-red-50";
      case "warning":
        return "text-yellow-600 border-yellow-200 bg-yellow-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-10">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Hủy Thanh Toán</h1>
        <div
          className={`text-lg font-medium p-4 rounded-xl border ${getStatusStyle()}`}
        >
          {statusMessage}
        </div>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Quay về Trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default CancelPaymentPage;
