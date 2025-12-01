import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../icons/logo_white.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const footerData = {
    company: {
      description: "Flyora – Nâng niu đàn chim Việt. Hãy đến với chúng tôi!",
    },
    navigation: [
      {
        title: "Hỗ trợ",
        links: [{ name: "Về chúng tôi" }, { name: "Tin tức" }],
      },
      {
        title: "Chính sách",
        links: [
          { name: "Chính sách đổi trả" },
          { name: "Chính sách bảo hành" },
          { name: "Chính sách giao hàng" },
        ],
      },
    ],
    store: {
      title: "Cửa hàng",
      address: "12 Hoang Hoa Tham, Quan 3, TP.HCM",
      phone: "+775 378-6348",
      email: "ntrang21102005@gmail.com",
    },
  };

  const hrefMap = {
    "Về chúng tôi": { path: "/about-us", sectionId: "about-us" },
    "Tin tức": { path: "/news", sectionId: "news" },
    "Chính sách đổi trả": {
      path: "/inspectionPolicy",
      sectionId: "inspectionPolicy",
    },
    "Chính sách bảo hành": {
      path: "/privacyPolicy",
      sectionId: "privacyPolicy",
    },
    "Chính sách giao hàng": {
      path: "/deliveryPolicy",
      sectionId: "deliveryPolicy",
    },
  };

  const handleLinkClick = (hrefObj) => {
    if (!hrefObj) return;

    const { path, sectionId } = hrefObj;

    if (location.pathname === path) {
      const el = document.getElementId(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(path, { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden [background:linear-gradient(336deg,rgba(8,54,34,1)_0%,rgba(18,171,60,1)_100%)]">
      <div className="relative w-full py-6 pb-2 z-10">
        {/* Decorative images with adjusted z-index */}
        <img
          className="absolute w-[135px] h-[194px] top-[77px] left-1/2 -translate-x-1/2 opacity-10 blur-1 z-0"
          alt="Bird"
          src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/img-4.png"
        />
        <img
          className="w-[678px] h-[390px] left-0 absolute top-0 z-0"
          alt="Group"
          src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/group-9-2.png"
        />
        <img
          className="absolute w-[83px] h-[92px] top-[53px] right-[13px] z-0"
          alt="Star"
          src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-19-1.svg"
        />
        <img
          className="absolute w-[83px] h-[92px] top-[155px] right-[86px] z-0"
          alt="Star"
          src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-20.svg"
        />
        <img
          className="absolute w-[83px] h-[92px] top-[252px] right-[3px] z-0"
          alt="Star"
          src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-17-1.svg"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Logo + Socials */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 relative z-10">
              <div className="ml-4 sm:ml-[19px] mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={logo}
                    alt="Flyora logo"
                    className="w-[120px] sm:mt-[-20px] h-auto"
                  />
                </div>
                <div className="mt-2 sm:mt-[5px] font-['Poppins',Helvetica] font-normal text-white text-sm sm:text-base leading-[20.5px] max-w-[300px] sm:max-w-[349px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                  {footerData.company.description}
                </div>
                <div className="mt-4 sm:mt-[32px] flex gap-2 sm:gap-4">
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded-full flex items-center justify-center hover:bg-white transition"
                  >
                    <FaFacebookF className="text-white text-lg sm:text-xl" />
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded-full flex items-center justify-center hover:bg-white transition"
                  >
                    <FaInstagram className="text-white text-lg sm:text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            {footerData.navigation.map((section, i) => (
              <div
                key={i}
                className={`col-span-1 sm:col-span-1 lg:col-span-2 ${
                  i === 0 ? "lg:ml-4 sm:ml-0" : ""
                } z-10`}
              >
                <h3 className="font-['Poppins',Helvetica] font-semibold text-white text-sm sm:text-base mb-3 sm:mb-5">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2 sm:gap-4">
                  {section.links.map((link, index) => {
                    const hrefObj = hrefMap[link.name];
                    return (
                      <li key={index}>
                        <button
                          type="button"
                          className="font-['Poppins',Helvetica] font-normal text-white text-sm sm:text-base bg-transparent border-none p-0 m-0 cursor-pointer hover:underline focus:underline"
                          aria-label={link.name}
                          onClick={() => handleLinkClick(hrefObj)}
                        >
                          {link.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* Store info */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 z-10 ml-[70px]">
              <h3 className="font-['Poppins',Helvetica] font-semibold text-white text-sm sm:text-base mb-3 sm:mb-5 text-right]">
                {footerData.store.title}
              </h3>
              <div className="flex flex-col gap-3 sm:gap-5">
                <p className="font-['Poppins',Helvetica] font-medium text-white text-sm sm:text-base leading-5 max-w-[120px] sm:max-w-[200px] whitespace-nowrap">
                  {footerData.store.address}
                </p>
                <div className="flex flex-col gap-1 sm:gap-5">
                  <p className="font-['Poppins',Helvetica] font-medium text-white text-sm sm:text-base leading-5 whitespace-nowrap">
                    {footerData.store.phone}
                  </p>
                  <p className="font-['Poppins',Helvetica] font-medium text-white text-sm sm:text-base leading-5 max-w-[200px] sm:max-w-[229px]">
                    {footerData.store.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 font-['Poppins',Helvetica] font-normal text-white text-xs sm:text-sm">
          © Copyright Bird Shop 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
