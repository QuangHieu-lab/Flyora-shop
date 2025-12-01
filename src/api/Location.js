import axios from "axios";

const BASE = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1";

/**
 * Lấy danh sách Tỉnh/Thành
 * @param {number} requesterId
 */
export const getProvinces = async (requesterId) => {
  const res = await axios.get(`${BASE}/shipping-utils/provinces`, {
    params: { requesterId },
  });
  return res.data;
};

/**
 * Lấy danh sách Quận/Huyện theo tỉnh
 * @param {number} requesterId
 * @param {number} provinceId
 */
export const getDistricts = async (requesterId, provinceId) => {
  const res = await axios.get(`${BASE}/shipping-utils/districts`, {
    params: { requesterId, provinceId },
  });
  return res.data;
};

/**
 * Lấy danh sách Phường/Xã theo quận
 * @param {number} requesterId
 * @param {number} districtId
 */
export const getWards = async (requesterId, districtId) => {
  const res = await axios.get(`${BASE}/shipping-utils/wards`, {
    params: { requesterId, districtId },
  });
  return res.data;
};
