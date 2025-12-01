import React from "react";
import { NavLink } from "react-router-dom";
import cartIcon from "../../icons/cart-shop.png";
import { useAuthCart } from "../../context/AuthCartContext";
import toast from "react-hot-toast";

const ProductCard = ({ id, image, title, price }) => {
  const { isLoggedIn, addToCart } = useAuthCart();

  const handleAddCart = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart({ id, name: title, price, imageUrl: image });
    toast.success("Đã thêm vào giỏ hàng! 🎉");
  };

  return (
    <NavLink to={`/products/${id}`} className="block">
      <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-contain mb-3"
        />
        <div className="flex items-center justify-between mb-1 mt-auto">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            onClick={handleAddCart}
            className="ml-2 w-7 h-7 rounded-full flex items-center justify-center hover:bg-orange-50 active:scale-95"
            tabIndex={-1}
            type="button"
          >
            <img
              src={cartIcon}
              alt="Add to cart"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
        <p className="text-green-600 font-bold text-base">{price.toLocaleString()} VND</p>
      </div>
    </NavLink>
  );
};

export default ProductCard;
