import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import phoneIcon from "../../icons/phone.png";
import mailIcon from "../../icons/mail.png";
import locationIcon from "../../icons/location.png";
import logoChim from "../../icons/logo-chim.png";
import logoBlack from "../../icons/logo_black.png";
import searchIcon from "../../icons/search.png";
import sunIcon from "../../icons/sun.png";
import cartIcon from "../../icons/cart.png";
import loginIcon from "../../icons/login.png";
import bird from "../../icons/bird_hi.png";
import { useAuthCart } from "../../context/AuthCartContext";
import { PhoneIcon } from "lucide-react";

function Header() {
  const { cartCount, isLoggedIn, logout } = useAuthCart();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setNav] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const customerId = localStorage.getItem("linkedId"); // Lấy linkedId từ localStorage
  // Nếu không có linkedId, có thể đặt là null hoặc một giá trị mặc định
  // const customerId = null; // Hoặc một giá trị mặc định nếu không có

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/shop" },
    { name: "Khuyến mãi", href: "/promotions" },
    { name: "Tin tức", href: "/news" },
    // { name: "Liên hệ", href: "/contact-us" },
  ];

  const handleProtectedClick = (action) => {
    if (!isLoggedIn) {
      if (action === "cart") toast.error("Bạn cần đăng nhập để xem giỏ hàng!");
      else toast.error("Bạn cần đăng nhập để truy cập!");
    } else {
      navigate(`/${action}`);
    }
  };

  // giữ giá trị search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    setSearchQuery(keyword); // Cập nhật lại input mỗi khi URL thay đổi
  }, [location.search]);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/shop"); // Xóa query -> load tất cả sản phẩm
    }
  };

  const starIcons = [
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-19.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-[100px] left-[1350px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-20-1.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-60 left-[1303px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-17.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-[357px] left-[1340px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-16.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-[419px] left-[1225px]",
    },
  ];

  return (
    <header className="relative w-full [background:linear-gradient(336deg,rgba(8,54,34,1)_0%,rgba(18,171,60,1)_100%)] overflow-visible pb-10 md:pb-16">
      {/* className="relative w-full bg-gradient-to-tr from-[#12AB3C] to-[#083622] overflow-visible pb-10 md:pb-16" */}
      {/* Top contact bar */}
      <div className="w-full mx-auto py-4 md:py-7 px-4 mt-0">
        <div className="flex flex-col md:flex-row justify-evenly items-center w-full max-w-7xl mx-auto gap-4 md:gap-0">
          <div className="flex items-center">
            <img
              src={phoneIcon}
              alt="Phone"
              className="w-5 h-5 absolute left-[218px]"
            />
            <span className="font-medium text-white text-sm md:text-base absolute left-[240px]">
              +84 3367 8915
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={mailIcon}
              alt="Mail"
              className="w-5 h-5 absolute left-[390px]"
            />
            <span className="font-medium text-white text-sm md:text-base absolute left-[418px]">
              ntrang21102005@gmail.com
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={locationIcon}
              alt=""
              className="w-5 h-5 absolute right-[470px]"
            />
            <span className="font-medium text-white text-sm md:text-base absolute right-[220px]">
              12 Hoàng Hoa Thám, Q.3, TP.HCM
            </span>
          </div>
        </div>
      </div>
      {/* Sun icon with lower z-index */}
      <img
        src={sunIcon}
        alt=""
        className="hidden md:block absolute w-[170px] h-[181px] left-[35%] top-[9%] z-0 pointer-events-none"
      />
      {/* Main navigation bar with higher z-index */}
      <div className="relative z-20 bg-white rounded-full shadow-lg flex items-center top-[-40px] justify-around px-4 md:px-8 my-4 md:mx-auto w-full max-w-4xl md:max-w-6xl mt-2 md:my-10 h-16 md:h-20">
        <div className="flex items-center ">
          <img src={logoBlack} alt="Flyora" className="w-22 md:w-26 h-auto" />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center z-30"
          onClick={() => setNav(!showNav)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={showNav ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-lg md:text-xl font-semibold z-20">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "text-black hover:text-orange-500"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3 md:space-x-5 z-20">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="border rounded-full px-3 py-1 w-32 sm:w-40 md:w-64 lg:w-80 pr-16 text-sm md:text-base"
            />

            {/* Nút clear (X) */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  navigate("/shop");
                }}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}

            {/* Icon search */}
            <img
              src={searchIcon}
              alt="Search"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 md:h-6 cursor-pointer"
            />
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={() => handleProtectedClick("cart")}
            className="relative z-20"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            {isLoggedIn && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login Menu with proper z-index */}
          <div className="relative z-30">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="z-30 relative"
            >
              <img src={loginIcon} alt="Login" className="w-6 h-6" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50 border">
                {!isLoggedIn ? (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Đăng ký
                    </NavLink>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/order-history?customerId=${customerId}`}
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Lịch sử đơn hàng
                    </Link>

                    <NavLink
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Thông tin cá nhân
                    </NavLink>

                    <button
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                        toast.success("Đăng xuất thành công!");
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-semibold"
                    >
                      Đăng xuất
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile nav with proper z-index */}
      {showNav && (
        <nav className="md:hidden bg-white shadow-lg mx-4 rounded-md py-4 relative z-40">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              onClick={() => setNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-lg font-semibold text-orange-500 border-l-4 border-orange-500"
                  : "block px-4 py-2 text-lg font-semibold text-black hover:text-orange-500"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      )}
      {/* Content section with lower z-index */}
      <div className="relative px-4 md:px-20 pt-4 md:pt-10 z-10">
        <div className="max-w-2xl mx-auto md:ml-20 md:mx-0">
          <img
            className="w-[1000px] h-[470px] right-[-50px] absolute top-0 z-0"
            alt="Group"
            src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/group-9-2.png"
          />
          <img
            src={logoChim}
            alt="Flyora"
            className="w-[362px] h-[172px] mx-auto md:mx-0 mb-4 md:mb-0"
          />

          {/* <img
                  className="absolute w-[108px] h-[113px] top-1.5 left-0.5 rotate-[-170.39deg]"
                  alt="Group"
                  src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/group-10.png"
                />
              </div>
              <div className="text-[32px] text-[#fd7e14] font-bold [font-family:'Inter',Helvetica]">
                Flyora Shop
              </div> */}

          <div className="flex items-center justify-start gap-4 md:gap-6">
            {/*chim anime/}
            {/* <img
              src={bird}
              alt="Bird"
              className="w-auto h-[80px] md:h-[96px] object-contain"
            /> */}

            <div>
              <p className="text-white text-sm md:text-base mb-1">
                Thế giới sản phẩm cho những chú chim cưng của bạn!
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                Yêu Chim Cưng trọn niềm vui!
              </h1>
            </div>
          </div>
        </div>
      </div>

      <img
        alt="Bird"
        src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/img-4.png"
        className="hidden md:block absolute w-[120px] h-auto top-[150px] right-[550px] z-0 opacity-90 blur-[1px] pointer-events-none"
        //"hidden md:block absolute left-[35%] top-[15%] h-32 md:h-48 z-0 pointer-events-none"
        //"absolute w-[135px] h-[194px] top-[77px] left-1/2 -translate-x-1/2 opacity-10 blur-sm z-0"
      />

      {starIcons.map((star, index) => (
        <img
          key={`${star.src}-${index}`}
          className={`${star.className} z-0 pointer-events-none`}
          alt=""
          src={star.src}
        />
      ))}
    </header>
  );
}

export default Header;
