import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import chaomao from "../../icons/chaomao.png";
import chichchoe from "../../icons/chichchoe.png";
import vetxich from "../../icons/vetxich.png";
import yenphung from "../../icons/yenphung.png";

const BackgroundSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (tagName) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("tag", tagName);
    navigate(`/shop?${newParams.toString()}`);
  };

  // Data for bird categories
  const birdCategories = [
    {
      name: "Chào Mào",

      image: "https://i.postimg.cc/pVQ7qM1k/Link.png",
    },
    {
      name: "Vẹt Xích",
      image: "https://i.postimg.cc/j506J6C8/vetxich.png",
    },
    {
      name: "Yến Phụng",
      image: "https://i.postimg.cc/xTRsDZq9/yenphung.png",
    },
    {
      name: "Chích Chòe",
      image: "https://i.postimg.cc/sXNn8G27/chichchoe.png",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="px-[200px]">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Chuyên sản phẩm cho các loại chim
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex justify-between ">
          {birdCategories.map((bird, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md">
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={bird.image}
                  alt={bird.name}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => handleClick(bird.name)}
                />
              </div>
              <div className="px-4 py-2">
                <a
                  href={bird.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="text-md font-bold text-black">{bird.name}</p>
                  <p className="text-primary-orange text-sm font-semibold">
                    {bird.scientificName}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BackgroundSection;
