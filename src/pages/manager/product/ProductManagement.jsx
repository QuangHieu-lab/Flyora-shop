import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { useAuthCart } from "../../../context/AuthCartContext";
import Sidebar from "pages/admin/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { getAllProductsByOwner } from "api/ProductMgm";

const ProductManagement = () => {
  const { logout, user } = useAuthCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination & search
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = user?.token;
        const data = await getAllProductsByOwner(token);
        if (!Array.isArray(data)) {
          console.error("Dữ liệu sản phẩm không hợp lệ:", data);
          throw new Error("API không trả về danh sách sản phẩm");
        }
        setProducts(
          data.map((item) => ({
            id: item.id,
            nameProduct: item.name,
            price: item.price,
            totalQuantity: item.stock,
            status: item.status === "Còn hàng" ? "Active" : "Inactive",
            image: item.imageUrl,
          }))
        );
      } catch (error) {
        if (error.response?.status === 403) {
          alert("Bạn không có quyền truy cập");
          navigate("/unauthorized");
        } else {
          console.error("Lỗi khi tải sản phẩm:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, navigate]);

  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <span className="inline-flex items-center justify-center whitespace-nowrap w-fit px-3 py-1 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
        Còn hàng
      </span>
    ) : (
      <span className="inline-flex items-center justify-center whitespace-nowrap w-fit px-3 py-1 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-full">
        Hết hàng
      </span>
    );
  };

  // Filter & pagination logic
  const filteredProducts = products.filter((product) =>
    product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const generatePagination = () => {
    const pages = [];
    const maxVisible = 5;
    const left = Math.max(1, currentPage - 2);
    const right = Math.min(totalPages, currentPage + 2);

    if (left > 1) pages.push(1, "...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) pages.push("...", totalPages);

    return pages;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Quản lý sản phẩm
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Danh sách sản phẩm
              </h2>
              <button
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => navigate("/shopowner/add-product")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm mới
              </button>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-10 text-gray-500">
                  Đang tải dữ liệu...
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Hình ảnh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tên sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Giá (VND)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.id}
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.nameProduct}
                            className="w-10 h-10 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.nameProduct}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.price.toLocaleString()} VND
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.totalQuantity}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(product.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              className="p-1 text-blue-600 hover:text-blue-800"
                              onClick={() =>
                                navigate(
                                  `/shopowner/products/edit-product/${product.id}`
                                )
                              }
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-col items-center px-6 py-4 border-t border-gray-200 space-y-2">
                <span className="text-sm text-gray-500">
                  Trang {currentPage} / {totalPages}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-100"
                      }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>
                  {generatePagination().map((page, i) =>
                    page === "..." ? (
                      <span
                        key={i}
                        className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={i}
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${currentPage === page
                          ? "bg-green-500 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                          }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-100"
                      }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;
