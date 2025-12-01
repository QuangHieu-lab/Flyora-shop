import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../api/OrderHistory";
import { NavLink } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customerId = localStorage.getItem("linkedId");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrderHistory(customerId);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchOrders();
    } else {
      setError("You must be logged in to view your orders.");
      setLoading(false);
    }
  }, [customerId]);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-10 py-10 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Lịch sử đơn hàng
      </h1>

      {loading && (
        <div className="text-center text-gray-500">Đang tải đơn hàng ...</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-medium">{error}</div>
      )}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center text-gray-500">
          Bạn chưa có đơn đặt hàng nào. Hãy đặt hàng nhé!
        </div>
      )}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => {
            const subtotal = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            const shippingCharge = 30000;
            const total = subtotal + shippingCharge;

            return (
              <div
                key={order.orderId}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Mã Đơn Hàng: #{order.orderId}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Thời gian:{" "}
                      {new Date(order.orderDate).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm">
                      Trạng thái:{" "}
                      <span
                        className={`${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : "text-orange-500"
                        } font-medium`}
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0">
                    <NavLink
                      to={`/order-details/${order.orderId}`}
                      state={{ order }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Chi tiết đơn hàng
                    </NavLink>
                  </div>
                </div>

                <div className="divide-y">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between py-3"
                    >
                      <div>
                        <p className="text-sm md:text-base font-medium text-gray-800">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm md:text-base font-semibold text-gray-800">
                        {item.price.toLocaleString()} VND
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end border-t pt-4 mt-4">
                  <p className="text-base font-semibold text-black-500">
                    Thành tiền:{" "}
                    <span className="text-lg text-black-500">
                      {total.toLocaleString()} VND
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
