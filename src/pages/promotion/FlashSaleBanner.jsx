import React, { useEffect, useState } from "react";
import banner from "../../icons/Banner.png";
import flower from "../../icons/flower.png";
import { useNavigate } from "react-router-dom";

const COUNTDOWN_DURATION = 86400 * 1000; // 23:00:00 = 23*60*60 = 82800s // 1 ngày = ms

const FlashSaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEndTime = localStorage.getItem("flashSaleEndTime");

    let endTime;
    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      endTime = Date.now() + COUNTDOWN_DURATION;
      localStorage.setItem("flashSaleEndTime", endTime.toString());
    }

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        localStorage.removeItem("flashSaleEndTime");
      }
    };

    updateCountdown(); // initial run
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden">
      <img src={banner} alt="Flash Sale Banner" className="w-full h-auto" />

      <div className="flex items-center font-genos text-[47px] font-extrabold tracking-[.7em] text-black absolute top-[325px] left-[78%] transform -translate-x-1/2  rotate-[-3deg]">
        <span className="ml-6">{formatTime(timeLeft)}</span>
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="absolute top-[240px] left-[870px] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-[15px] text-[20px] font-bold shadow-lg hover:bg-white hover:text-black transition max-w-[160px]"
      >
        <img src={flower} alt="flower" className="w-5 h-5 flex-shrink-0" />
        <span className="break-words leading-tight text-center">
          Đặt Hàng Ngay
        </span>
      </button>
    </div>
  );
};

export default FlashSaleBanner;
