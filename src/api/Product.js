// import axios from "axios";

// export async function getProductsByCategory(categoryId) {
//   try {
//     const response = await axios.post(
//       "https://flyora-backend.onrender.com/api/v1/products/filter",
//       {
//         categoryId: parseInt(categoryId),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("API error:", error.message);
//     throw error;
//   }
// }


import axios from "axios";

const API_URL = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/products/filter";

/**
 * Lấy danh sách sản phẩm theo điều kiện
 * @param {Object} params 
 * params bao gồm:
 * - name (string)          : tìm kiếm theo tên sản phẩm (optional)
 * - categoryId (number)    : lọc theo categoryId (optional)
 * - birdTypeId (number)    : lọc theo birdTypeId nếu có (optional)
 * - minPrice (number)      : giá tối thiểu (optional)
 * - maxPrice (number)      : giá tối đa (optional)
 * - page (number)          : trang (default: 0)
 * - size (number)          : số sản phẩm trên 1 trang (default: 10)
 */
export async function getProductsByCategory(params = {}) {
  const requestBody = {
    name: params.name || "",
    categoryId: params.categoryId || null,
    birdTypeId: params.birdTypeId || null,
    minPrice: params.minPrice || null,
    maxPrice: params.maxPrice || null,
    // page: params.page || 0,
    // size: params.size || 12,
  };

  try {
    const response = await axios.post(API_URL, requestBody);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
