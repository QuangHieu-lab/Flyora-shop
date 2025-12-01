import React, { useState } from "react";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../../api/register/Register";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", // Đã có name
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      await RegisterAPI(
        form.username,
        form.email,
        form.password,
        form.phone,
        form.name
      );

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Đăng ký thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#083622] to-[#12ab3c] px-4 md:px-16 py-8 flex items-center justify-center">
      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-green-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-lg font-semibold text-green-600">
              Đăng ký thành công!
            </span>
          </div>
        </div>
      )}

      {/* Header contact */}
      <header className="absolute top-0 left-0 w-full px-12 py-4 text-sm z-20 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 text-white font-bold">
            <PhoneIcon className="w-5 h-5" />
            <span>+84 33678915</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <MailIcon className="w-5 h-5" />
            <span>ntrang21102005@gmail.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0 text-white font-bold">
          <MapPinIcon className="w-5 h-5" />
          <span>12 Hoang Hoa Tham, Quan 3, TP.HCM</span>
        </div>
      </header>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img
          className="absolute bottom-0 left-0 w-[600px] opacity-20 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/group-9.png"
          alt="Bird bg"
        />
        <img
          className="absolute top-[90px] left-[733px] w-[204px] opacity-30 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/img.png"
          alt="Bird"
        />
        <img
          className="absolute top-[426px] right-[120px] w-[135px] opacity-30 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/star-16.svg"
          alt="Star"
        />
        <img
          className="absolute top-[364px] right-[30px] w-[136px] opacity-30 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/star-17.svg"
          alt="Star"
        />
        <img
          className="absolute top-[123px] right-[70px] w-[136px] opacity-30 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/star-19.svg"
          alt="Star"
        />
        <img
          className="absolute top-[247px] right-[60px] w-[136px] opacity-30 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/star-20.svg"
          alt="Star"
        />
        <img
          className="absolute top-[-140px] right-[300px] w-[246px] h-[215px] opacity-20 blur-sm"
          src="https://c.animaapp.com/mc39o30rr6LbxJ/img/ellipse-3.png"
          alt="Ellipse"
        />
      </div>

      {/* Register content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-6xl z-10 mt-24">
        {/* Welcome text */}
        <div className="text-white">
          <div className="flex items-center mb-6">
            <img
              className="w-20 h-20 mr-4"
              src="https://c.animaapp.com/mc39o30rr6LbxJ/img/group-10.png"
              alt="Logo"
            />

            <h1 className="text-[50px] font-bold">
              <span className="text-orange-500">Flyora</span>{" "}
              <span className="text-orange-500">Shop</span>
            </h1>
          </div>
          <h2 className="text-[40px] font-bold mb-6">CHÀO MỪNG ĐẾN VỚI FLYORA SHOP</h2>
          <p className="text-xl mb-8">Cửa hàng chim với mọi thứ bạn cần</p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg rounded shadow"
            onClick={() => navigate("/")}
          >
            Khám Phá Chúng Tôi
          </Button>
        </div>

        {/* Register form */}
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-xl">
          <CardContent className="p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label className="block font-medium mb-1 text-gray-700">
                  Họ và tên
                </Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full px-4 py-2 rounded shadow text-gray-700 placeholder:text-gray-400 placeholder:font-normal"
                  required
                />
              </div>
              <div>
                <Label className="block font-medium mb-1 text-gray-700">
                  Tên đăng nhập
                </Label>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="User name"
                  className="w-full px-4 py-2 rounded shadow text-gray-700 placeholder:text-gray-400 placeholder:font-normal"
                  required
                />
              </div>

              <div>
                <Label className="block font-medium mb-1 text-gray-700">
                  Địa chỉ email
                </Label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="E-mail address..."
                  className="w-full px-4 py-2 rounded shadow text-gray-700 placeholder:text-gray-400 placeholder:font-normal"
                  required
                />
              </div>

              <div>
                <Label className="block font-medium mb-1 text-gray-700">
                  Số Điện thoại
                </Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number..."
                  className="w-full px-4 py-2 rounded shadow text-gray-700 placeholder:text-gray-400 placeholder:font-normal"
                  required
                />
              </div>

              <div>
                <Label className="block font-medium mb-1 text-gray-700">
                  Mật Khẩu
                </Label>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password..."
                  className="w-full px-4 py-2 rounded shadow text-gray-700 placeholder:text-gray-400 placeholder:font-normal"
                  required
                />
              </div>

              <div>
                <Label className="block font-medium mb-1 text-gray-700">
                  Xác nhận mật khẩu
                </Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password..."
                  className="w-full px-4 py-2 rounded shadow"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm font-semibold text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-black font-semibold py-2 rounded shadow transition-colors hover:bg-orange-600 hover:text-white"
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>

              <div className="text-center text-sm">
                Chào mừng đã đến với Flyora?{" "}
                <a href="/login" className="text-blue-600 font-medium">
                  Đăng nhập ngay!
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
