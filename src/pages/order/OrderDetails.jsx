import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductDetail } from "../../api/ProductDetail";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { order } = location.state || {};
  const [orderData, setOrderData] = useState(order);
  const [productImages, setProductImages] = useState({}); // Lưu ảnh theo productId

  useEffect(() => {
    if (!order) {
      navigate("/order-history");
    }
  }, [order, navigate]);

  // Fetch product images
  useEffect(() => {
    const fetchImages = async () => {
      if (orderData) {
        const images = {};
        await Promise.all(
          orderData.items.map(async (item) => {
            try {
              const product = await getProductDetail(item.productId);
              images[item.productId] = product.imageUrl;
            } catch (error) {
              images[item.productId] = null; // fallback nếu lỗi
            }
          })
        );
        setProductImages(images);
      }
    };
    fetchImages();
  }, [orderData]);

  if (!orderData) return null;

  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCharge = 30000;
  const taxes = 0;
  const discount = 0;
  const total = subtotal + shippingCharge + taxes - discount;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Chi tiết đơn đặt hàng
        </h1>
        <div className="text-sm text-gray-600">
          Mã đơn hàng: #{orderData.orderId}
        </div>
        <div className="text-sm text-green-600">
          Cảm ơn bạn đã tin tưởng Flyora!
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-10">
        {orderData.items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              {productImages[item.productId] ? (
                <img
                  src={productImages[item.productId]}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center text-white text-xs">
                  IMG
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h4 className="text-base md:text-lg font-semibold text-gray-900">
                {item.productName}
              </h4>
              <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {item.price.toLocaleString()} VND
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tóm tắt đơn hàng
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng tiền hàng</span>
            <span className="text-gray-900 font-medium">
              {subtotal.toLocaleString()} VND
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vận chuyển</span>
            <span className="text-gray-900 font-medium">
              {shippingCharge.toLocaleString()} VND
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thuế</span>
            <span className="text-gray-900 font-medium">
              {taxes.toLocaleString()} VND
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Giảm giá</span>
            <span className="text-gray-900 font-medium">
              {discount.toLocaleString()} VND
            </span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-3 font-semibold text-base">
            <span className="text-gray-900">Thành tiền</span>
            <span className="text-gray-900 text-lg font-bold">
              {total.toLocaleString()} VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
