import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getCategories } from "../../api/Categories";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("categoryId");

  const nameViMap = {
  "Food": "Thức ăn",
  "Toy": "Đồ chơi",
  "Furniture": "Nội thất",
  // Thêm các ánh xạ khác nếu cần
};


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (

    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Tìm kiếm theo danh mục
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <NavLink

            key={cat.id}
            to={`/shop?categoryId=${cat.slug}`}
            className={`rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition duration-300 block ${
              selectedCategory === cat.slug ? "border-2 border-orange-500" : ""
            }`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/category-pics/default.jpg"; // fallback nếu lỗi ảnh
              }}
            />
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{nameViMap[cat.name] || cat.name}</h3>

              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;