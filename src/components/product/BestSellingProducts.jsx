//BestSellingProducts.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cartIcon from "../../icons/cart-shop.png";
import { useAuthCart } from "../../context/AuthCartContext";
import toast from "react-hot-toast";
import axios from "axios";

const BestSellingProducts = () => {
  const [product, setProduct] = useState([]);
  const { isLoggedIn, addToCart } = useAuthCart();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/products/best-sellers/top15"
        );
        const mapped = response.data.map((item) => ({
          id: item.productId,
          name: item.productName,
          price: item.price,
          imageUrl: item.imageUrl,
        }));
        setProduct(mapped);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
        toast.error("Không thể tải sản phẩm bán chạy.");
      }
    };

    fetchBestSellers();
  }, []);

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      toast.error("Bạn phải đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart(id);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (

    <div className="py-12 px-4 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Sản phẩm phổ biến

      </h2>

      {/* ✅ Grid layout chia 3 hàng, mỗi hàng 5 sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-10 max-w-7xl mx-auto">
        {product.map((p) => (
          <NavLink key={p.id} to={`/product/${p.id}`} className="block h-full">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 flex flex-col min-h-[350px] aspect-[4/5] p-4 w-full">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-[180px] object-contain rounded-xl bg-gray-50"
              />
              <div className="flex-1 flex flex-col justify-between mt-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[16px] leading-5">
                    {p.name}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(p.id);
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <img
                      src={cartIcon}
                      alt="cart"
                      className="w-5 h-5"
                      style={{
                        filter:
                          "invert(48%) sepia(95%) saturate(2496%) hue-rotate(359deg) brightness(104%) contrast(100%)",
                      }}
                    />
                  </button>
                </div>
                <p className="text-gray-700 font-semibold text-base mt-2">
                  {p.price.toLocaleString()} VNĐ
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
