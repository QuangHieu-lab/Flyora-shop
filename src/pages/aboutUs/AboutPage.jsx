import React from "react";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import teamImg from "../../icons/team.png";
import clientImg from "../../icons/client.png";
import fb from "../../icons/facebook.png";

const AboutPage = () => {
  return (
    <div className="px-4 md:px-16 lg:px-32 py-16 space-y-24 text-gray-800">
      {/* About section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cửa hàng của chúng tôi</h2>
          <p className="text-gray-600">
            Chúng tôi chuyên kinh doanh các sản phẩm thức ăn, đồ chơi, đồ nội
            thất dành cho các loại chim. Phục vụ các sản phẩm cho 4 loài chim
            chính: Chào Mào, Chích Chòe, Yến Phụng và Vẹt Xích. Với sự đa dạng
            về màu sắc và kích thước, chúng tôi mong muốn khách hàng có nhiều sự
            lựa chọn phù hợp.
          </p>
          <p className="text-gray-600">
            Chúng tôi cam kết cung cấp sản phẩm chất lượng cao, an toàn và thân
            thiện với môi trường.
          </p>
          <p className="text-gray-600">Flyora - Phục vụ từ trái tim.</p>
          <div>
            <h3 className="text-xl font-bold text-orange-500">200+</h3>
            <p className="text-sm">Khách hàng hài lòng</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 mt-11">
          <p className="text-gray-600">
            Chúng tôi đã phục vụ hàng trăm khách hàng và nhận được phản hồi tích
            cực từ cộng đồng yêu chim. Chúng tôi tự hào là một trong những cửa
            hàng hàng đầu trong lĩnh vực này, cung cấp các sản phẩm chất lượng
            và dịch vụ tận tâm.
          </p>
          <div>
            <h3 className="text-xl font-bold text-orange-500">50+</h3>
            <p className="text-sm">Sản phẩm</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={teamImg}
          alt="Our Team"
          className="rounded-xl w-full max-w-sm"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Đội ngũ của chúng tôi</h2>
          <p className="text-gray-600 mb-2">
            Chúng tôi là một đội ngũ đam mê và tận tâm với sứ mệnh mang đến
            những sản phẩm tốt nhất cho thú cưng của bạn. Mỗi thành viên trong
            đội ngũ đều có kinh nghiệm và kiến thức sâu rộng về các loài chim,
            đảm bảo rằng chúng tôi có thể cung cấp những sản phẩm phù hợp nhất.
          </p>
          <p className="text-gray-600">
            Chúng tôi luôn sẵn sàng lắng nghe và đáp ứng nhu cầu của khách hàng,
            từ việc tư vấn sản phẩm đến hỗ trợ sau bán hàng.
          </p>
          <p className="mt-6 italic font-signature">Flyora Teams</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-semibold text-orange-500">
            Trải nghiệm khách hàng
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="flex text-yellow-400 gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-gray-600 mb-4">
            "Tôi đã mua một số sản phẩm cho chim của mình từ cửa hàng này và tôi
            rất hài lòng với chất lượng. Sản phẩm đa dạng và đội ngũ nhân viên
            rất nhiệt tình, sẵn sàng tư vấn cho tôi những sản phẩm phù hợp
            nhất."
          </p>
          <p className="font-semibold">Lê Nguyễn Vũ Hoàng</p>
          <p className="text-sm text-gray-500">Khách hàng</p>
          <div className="flex gap-2 mt-4">
            <button className="w-8 h-8 rounded-full border text-xl flex items-center justify-center hover:bg-gray-100">
              &#8249;
            </button>
            <button className="w-8 h-8 rounded-full border text-xl flex items-center justify-center hover:bg-gray-100">
              &#8250;
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={clientImg}
            alt="Client"
            className="rounded-full w-56 h-56 object-cover border"
          />
        </div>
      </section>

      {/* Facebook Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Theo dõi chúng tôi trên Facebook
        </h2>

        <a
          href="https://www.facebook.com/profile.php?id=61578761994581&sk=about"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={fb}
            alt="Facebook"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
        {/* <div className="w-full h-64 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center">
          <span className="text-gray-500">
            <i className="fab fa-facebook-square text-4xl"></i>
            <p className="mt-2">
              Theo dõi chúng tôi để cập nhật tin tức và ưu đãi mới nhất!
            </p>
          </span>
        </div> */}
      </section>
    </div>
  );
};

export default AboutPage;
