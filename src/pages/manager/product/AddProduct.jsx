import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { useAuthCart } from '../../../context/AuthCartContext';
import Sidebar from 'pages/admin/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { logout } = useAuthCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    code: '',
    nameProduct: '',
    category: '',
    display: '',
    stock: '',
    price: '',
    vatTax: '',
    basePrice: '',
    quantity: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call or state update here later
    console.log('New Product:', product);
    alert('Product added successfully! (Simulated)');
    navigate('/manager-page/product');
  };

  const handleCancel = () => {
    navigate('/manager-page/product');
  };

  return (
<div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <Sidebar />
    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
          </div>
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search here"
                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Johndoe</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-6">
              <div className="w-1/2 space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="nameProduct"
                    value={product.nameProduct}
                    onChange={handleChange}
                    placeholder="Item Name"
                    className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">Mã sản phẩm</label>
                  <input
                    type="text"
                    name="code"
                    value={product.code}
                    onChange={handleChange}
                    placeholder="Generate Product Identifier"
                    className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">Danh mục</label>
                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Hình ảnh sản phẩm</label>
                <div className="w-full h-64 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-center text-gray-500">
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProduct((prev) => ({ ...prev, image: file }));
                      }
                    }}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer text-center">
                    Chọn tệp hình ảnh
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Trạng thái</label>
                <select
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Giá</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Thuế VAT (%)</label>
                <input
                  type="number"
                  name="vatTax"
                  value={product.vatTax}
                  onChange={handleChange}
                  placeholder="VAT Rate"
                  className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Mô tả sản phẩm</label>
                <textarea
                  name="description"
                  value={product.description || ''}
                  onChange={handleChange}
                  placeholder="Description"
                  className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="block text-lg font-medium text-gray-700">Giảm giá (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount || ''}
                  onChange={handleChange}
                  placeholder="Discount"
                  className="p-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Đóng
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
  );
};

export default AddProduct;