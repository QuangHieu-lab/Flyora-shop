import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cartIcon from "../../icons/cart-shop.png";
import toast from "react-hot-toast";
import { useAuthCart } from "../../context/AuthCartContext";
import { getProductsByCategory } from "../../api/Product";
import { getCategories } from "../../api/Categories";
import PriceFilter from "./PriceFilter";

// Mapping tags to birdTypeId
const birdTypeMap = {
  "Chào Mào": 1,
  "Vẹt Xích": 2,
  "Yến Phụng": 3,
  "Chích Chòe": 4,
};

const ProductFilterPage = () => {
  const { isLoggedIn, addToCart } = useAuthCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [minPrice, setMinPrice] = useState(15000);
  const [maxPrice, setMaxPrice] = useState(300000);

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  const paginatedProducts = product.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const tagsList = ["Chào Mào", "Vẹt Xích", "Yến Phụng", "Chích Chòe"];

  const params = new URLSearchParams(location.search);
  const tagFromUrl = params.get("tag");
  const categoryId = params.get("categoryId");
  const search = params.get("search");

  // Lấy danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products có lọc theo tags và price
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const payload = {
          name: search || "",
          categoryId: categoryId ? parseInt(categoryId) : null,
          birdTypeId: tagFromUrl ? birdTypeMap[tagFromUrl] : null,
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
        console.log("Sending payload:", payload);

        const response = await getProductsByCategory(payload);
        setProduct(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, search, tagFromUrl, minPrice, maxPrice]);

  // Click vào category
  const handleCategoryClick = (id) => {
    const isSelected = categoryId === String(id);
    const newParams = new URLSearchParams(location.search);

    if (isSelected) {
      newParams.delete("categoryId");
    } else {
      newParams.set("categoryId", id);
    }

    navigate(`/shop?${newParams.toString()}`);
  };

  // Click vào tag
  const handleTagClick = (tag) => {
    const newParams = new URLSearchParams(location.search);

    if (tag === tagFromUrl) {
      newParams.delete("tag");
    } else {
      newParams.set("tag", tag);
    }

    navigate(`/shop?${newParams.toString()}`);
  };

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      toast.error("Bạn phải đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart(id);
    toast.success("Đã thêm vào giỏ hàng! 🎉");
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [product, totalPages]);

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4 md:px-12">
      <div className="max-w-[1414px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar Filter */}
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-2">Lọc theo danh mục</h2>
            <ul className="space-y-2 text-gray-800">
              {categories.map((cat) => {
                const isSelected = categoryId === String(cat.id);
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full text-left flex justify-between ${isSelected ? "font-bold text-orange-500" : ""
                        }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Filter by Price */}
          <div>
            <PriceFilter
              min={15000}
              max={400000}
              onChange={(range) => {
                const [minPrice, maxPrice] = range;
                setMinPrice(minPrice);
                setMaxPrice(maxPrice);
              }}
            />
          </div>

          {/* Tags Filter */}
          <div>
            <h2 className="text-xl font-bold mb-2">Lọc theo thẻ</h2>
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`border px-3 py-1 rounded text-sm font-medium 
                    min-w-[100px] h-[40px] flex items-center justify-center
                    ${tagFromUrl === tag
                      ? "bg-orange-500 text-white"
                      : "bg-gray-50 text-black"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sản phẩm phổ biến */}
          <div>
            <h2 className="text-xl font-bold mb-2">Sản phẩm phổ biến</h2>
            <ul className="space-y-3">
              {product.slice(0, 4).map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <NavLink
                    to={`/product/${p.id}`}
                    state={{ product: p }}
                    className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {p.price.toLocaleString()} VNĐ
                      </p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {loading && (
            <div className="text-center text-gray-500 py-10">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-500 py-10">{error}</div>
          )}
          {!loading && !error && (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500">
                  Đang hiển thị {product.length} sản phẩm
                </span>
              </div>

              {product.length === 0 ? (
                <div className="text-center text-gray-500">
                  Không tìm thấy sản phẩm nào.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {paginatedProducts.map((p) => (
                      <NavLink
                        to={`/product/${p.id}`}
                        state={{ product: p }}
                        key={p.id}
                        className="block h-full"
                      >
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition flex flex-col h-full">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-[200px] object-cover rounded-xl"
                          />
                          <div className="mt-4 flex items-center justify-between">
                            <h3 className="font-semibold text-[16px] leading-5 max-w-[70%] truncate">
                              {p.name}
                            </h3>
                            <div className="flex gap-3 shrink-0">
                              <button
                                type="button"
                                tabIndex={-1}
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
                                />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-[15px] mt-1">
                            {p.price.toLocaleString()} VNĐ
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="flex flex-col items-center px-6 py-4 border-t border-gray-200 space-y-2">
                    <span className="text-sm text-gray-500">
                      Trang {currentPage} trên {totalPages}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-100"
                          }`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      ></button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${currentPage === i + 1
                            ? "bg-red-500 text-white"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${currentPage === totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-100"
                          }`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      ></button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterPage;
