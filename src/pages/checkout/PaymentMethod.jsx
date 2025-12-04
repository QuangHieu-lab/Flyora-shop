import React from "react";
import { FaTruck } from "react-icons/fa";

import Payos from "../../icons/payos.png"; // Assuming you have this image in your icons folder




const PaymentMethod = ({ method, onChange }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
    <div className="space-y-4">
      <label className="flex items-start border p-4 rounded-lg cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={method === "cod"}
          onChange={onChange}
          className="mt-1 mr-3"
        />
        <FaTruck className="text-green-500 text-3xl mr-3" />
        <div>
          <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
          <p className="text-sm mt-1">
            Khoảng 2-6 ngày bạn sẽ nhận được hàng và kiểm tra trước khi thanh
            toán. Hotline: <span className="text-red-500">053786348</span>
          </p>
        </div>
      </label>
    </div>
  </div>
);

export default PaymentMethod;
