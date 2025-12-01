import React from "react";

const policyList = [
  {
    title: "1./ Định nghĩa.",
    content: (
      <>
        Kiểm hàng là thực hiện các công việc kiểm tra và so sánh các sản
        phẩm/hàng hóa nhận được trong kiện hàng{" "}
        <a
          href="https://flyora-frontend.vercel.app/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flyora.vn
        </a>{" "}
        gửi với các sản phẩm trong đơn hàng mà quý khách hàng yêu cầu.
      </>
    ),
  },
  {
    title: "2./ Thời điểm kiểm hàng",
    content: (
      <>
        <span className="font-medium">Flyora.vn</span> chấp nhận cho khách hàng
        đồng kiểm với nhân viên giao hàng tại thời điểm nhận hàng (hoặc trong
        vòng 30p kể từ khi khách nhận được hàng hóa.)
        <br />
        Sau khi nhận hàng, khách hàng kiểm lại phát hiện sai, có thể liên lạc
        với bộ phận chăm sóc khách hàng để được hỗ trợ đổi trả.
        <br />
        <span className="italic">
          Lưu ý: Quý khách quay video lúc mở thùng hàng để đối chiếu khi cần
          thiết.
        </span>
      </>
    ),
  },
  {
    title: "3./ Phạm vi kiểm tra hàng hóa.",
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Khách hàng được kiểm đếm số lượng sản phẩm thực nhận, đối chiếu, so
          sánh các sản phẩm nhận được với sản phẩm đã đặt trên đơn sau khi nhân
          viên xác nhận đơn hàng theo các tiêu chí:
          <ul className="list-[circle] pl-6">
            <li>
              Theo các thuộc tính cơ bản hàng hóa: tên hàng, số lượng, thông tin
              của khách hàng trên các giấy tờ của đơn hàng.
            </li>
            <li>
              Theo mẫu mã được nhận thì bởi ảnh đại diện của sản phẩm được lưu
              khi đặt hàng và sau khi được nhân viên xác nhận đơn hàng.
            </li>
          </ul>
        </li>
        <li>
          Tuyệt đối không bóc, mở các hộp sản phẩm có tem niêm phong, tem đảm
          bảo.
        </li>
        <li>Không được cào lấy mã các sản phẩm có tích điểm, đổi quà.</li>
        <li>
          Quý khách hàng vui lòng không bóc và sử dụng các sản phẩm trong kiện
          hàng khi đang còn vấn đề trong quá trình kiểm tra hàng hóa với chúng
          tôi
        </li>
      </ul>
    ),
  },
  {
    title: "4./ Các bước xử lý khi hàng hóa nhận được không như đơn đặt hàng.",
    content: (
      <>
        Khi quý khách đồng kiểm, sản phẩm nhận được không như sản phẩm khách đặt
        trên đơn hàng.
        <br />
        Xin hãy liên hệ với hotline:
        <a href="tel:033678915" className="text-pink-600 font-bold pl-1">
          033678915
        </a>{" "}
        để được gặp bộ phận chăm sóc khách hàng xác nhận lại đơn hàng.
        <br />
        Trường hợp{" "}
        <a
          href="https://flyora-frontend.vercel.app/"
          className="text-blue-600 underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flyora.vn
        </a>{" "}
        đóng sai đơn hàng theo yêu cầu của khách, khách có thể không nhận hàng,
        không thanh toán. Trong trường hợp đơn hàng đã thanh toán, khách hàng có
        thể yêu cầu gửi lại đơn mới hay không,{" "}
        <a
          href="https://flyora-frontend.vercel.app/"
          className="text-blue-600 underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flyora.vn
        </a>{" "}
        sẽ hoàn lại tiền cho quý khách trong thời gian sớm nhất.
      </>
    ),
  },
  {
    title: "5./ Các kênh thông tin tiếp nhận khiếu nại của khách hàng.",
    content: (
      <>
        Mọi thông tin khiếu nại của khách hàng, chúng tôi tiếp nhận qua số
        hotline:{" "}
        <a href="tel:033678915" className="text-pink-600 font-bold">
          033678915
        </a>{" "}
        hoặc email:{" "}
        <a
          href="mailto:ntrang21102005@gmail.com"
          className="text-blue-600 underline"
        >
          ntrang21102005@gmail.com
        </a>
      </>
    ),
  },
];

const inspectionPolicy = () => (
  <div className="max-w-2xl mx-auto my-12 bg-white p-7 rounded-2xl shadow-lg border text-gray-900">
    <h2 className="font-bold text-xl mb-4">Chính sách kiểm hàng</h2>
    <div className="space-y-5 text-[15px] leading-relaxed">
      {policyList.map((item, idx) => (
        <div key={idx}>
          <div className="font-semibold mb-1">{item.title}</div>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  </div>
);

export default inspectionPolicy;
