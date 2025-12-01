import React, { useState, useEffect } from "react";
import { LogOut, BarChart3, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthCart } from "../../context/AuthCartContext";
import toast from "react-hot-toast";
import { getDashboardData } from "../../api/DashBoard";

const ITEMS_PER_PAGE = 8;

// Utility function to format currency
const formatCurrency = (amount) => {
  if (typeof amount !== "number") return amount;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
};

const DashBoard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthCart();
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Lấy token sau khi đăng nhập
      try {
        const res = await getDashboardData(token);
        if (Array.isArray(res)) {
          const mapped = res.map((p, index) => ({
            rank: index + 1,
            productId: p.productId,
            productName: p.productName,
            imageUrl: p.imageUrl,
            totalSold: p.totalSold,
            price: p.price,
          }));

          setProducts(mapped);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center p-6 border-b border-green-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold">Flyora</span>
          </div>
        </div>

        {/* Navigation */}

        <nav className="mt-8 flex-1">
          <div className="px-4 mb-2">
            <span className="text-sm font-medium text-green-200">Main</span>
          </div>
          <ul className="space-y-2 px-4">
            <li>
              <a
                href="/shopowner/products"
                className="flex items-center px-4 py-3 text-green-100 hover:bg-green-500 rounded-lg transition-colors"
              >
                <Package className="w-5 h-5 mr-3" />
                <span>Product</span>
              </a>
            </li>
            <li>
              <a
                href="/shopowner/dashboard"
                className="flex items-center px-4 py-3 bg-green-500 rounded-lg"
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  toast.success("Đăng xuất thành công!");
                  navigate("/");
                }}
                className="w-full text-left flex items-center px-4 py-3 text-red-200 hover:bg-green-500 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">DashBoard</h1>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Top Products Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">

                Danh sách sản phẩm bán chạy
              </h2>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th className="w-[50px] px-2 py-3 text-sm font-medium text-gray-700">

                      Top
                    </th>
                    <th className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700">
                      ID
                    </th>
                    <th className="w-[200px] px-2 py-3 text-sm font-medium text-gray-700">
                      Tên sản phẩm
                    </th>
                    <th className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700">
                      Hình ảnh
                    </th>
                    <th className="w-[180px] px-2 py-3 text-sm font-medium text-gray-700">
                      Độ phổ biến
                    </th>
                    <th className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700">
                      Tổng số bán
                    </th>
                    <th className="w-[120px] px-2 py-3 text-sm font-medium text-gray-700">
                      Giá
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-center">
                  {paginatedProducts.map((product, index) => (
                    <tr
                      key={product.productId || index}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-6 py-4">#{product.productId}</td>
                      <td className="px-6 py-4">{product.productName}</td>

                      {/* 👇 Thêm cột hình ảnh */}
                      <td className="px-6 py-4">
                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          className="w-12 h-12 object-contain mx-auto rounded"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <div className="w-28 mx-auto">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-400 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  (product.totalSold /
                                    Math.max(
                                      ...products.map((p) => p.totalSold),
                                      1
                                    )) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-600">
                        {product.totalSold}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col items-center px-6 py-4 border-t border-gray-200 space-y-2">
                <span className="text-sm text-gray-500">

                  Trang {currentPage} trên {totalPages}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                      currentPage === 1 
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                        currentPage === i + 1
                          ? "bg-red-500 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
