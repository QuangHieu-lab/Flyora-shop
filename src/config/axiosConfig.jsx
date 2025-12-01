import axios from "axios";

const API_BASE_URL = 'https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor 1: Request (Thêm Bearer Token) - Giữ nguyên
instance.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Interceptor 2: Response (Handle Data/401/403 errors) - Đã gộp và Fix Hook
instance.interceptors.response.use(
    function (response) {
        // SUCCESS: Trả về data
        return response.data;
    },
    function (error) {
        const status = error.response?.status;

        // FIX HOOKS: Xử lý 401/403 (Phiên đăng nhập hết hạn)
        if (status === 401 || status === 403) {
            console.warn("Phiên đăng nhập hết hạn. Đang chuyển hướng...");

            // Manual cleanup (thay thế cho useAuth().logout())
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('user');

            window.location.href = '/login';
        }

        // FAIL: Trả về lỗi chi tiết
        return Promise.reject(error.response?.data || error);
    }
);

export default instance;