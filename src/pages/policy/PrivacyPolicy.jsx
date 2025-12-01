import React from "react";

const data = [
  {
    title: "I. MỤC ĐÍCH VÀ PHẠM VI THU THẬP",
    content: (
      <>
        Việc thu thập dữ liệu chủ yếu trên website bao gồm: họ tên, email, điện
        thoại, địa chỉ khách hàng trong mục liên hệ. Đây là các thông tin mà
        chúng tôi cần thành viên cung cấp bắt buộc khi gửi thông tin nhờ tư vấn
        hay muốn mua sản phẩm và để chúng tôi liên hệ xác nhận lại với khách
        hàng trên website nhằm đảm bảo quyền lợi cho cho người tiêu dùng.
        <br />
        <br />
        Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt
        động sử dụng dịch vụ dưới thông tin mà mình cung cấp và hợp thư điện tử
        của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho
        website chúng tôi về những hành vi sử dụng trái phép, lạm dụng, vi phạm
        bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp
        giải quyết phù hợp.
      </>
    ),
  },
  {
    title: "II. PHẠM VI SỬ DỤNG THÔNG TIN",
    content: (
      <ul className="list-disc pl-6">
        <li>
          Liên hệ xác nhận đơn hàng và giao hàng cho thành viên khi nhận được
          yêu cầu từ thành viên;
        </li>
        <li>
          Cung cấp thông tin về sản phẩm đến khách hàng nếu có yêu cầu từ khách
          hàng;
        </li>
        <li>Gửi email tiếp thị, khuyến mại về hàng hóa do chúng tôi bán;</li>
        <li>Gửi các thông báo về các hoạt động trên website</li>
        <li>
          Liên lạc và giải quyết với người dùng trong những trường hợp đặc biệt;
        </li>
        <li>
          Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận
          và liên hệ có liên quan đến giao dịch
        </li>
        <li>
          Khi có yêu cầu của cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ
          quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó
          của khách hàng.
        </li>
      </ul>
    ),
  },
  {
    title: "III. THỜI GIAN LƯU TRỮ THÔNG TIN",
    content: (
      <>
        Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu
        ban quản trị hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân
        thành viên sẽ được bảo mật trên máy chủ của chúng tôi.
      </>
    ),
  },
  {
    title:
      "IV. NHỮNG NGƯỜI HOẶC TỔ CHỨC CÓ THỂ ĐƯỢC TIẾP CẬN VỚI THÔNG TIN CÁ NHÂN",
    content: (
      <ul className="list-disc pl-6">
        <li>Ban quản trị website</li>
        <li>Khách hàng sở hữu thông tin cá nhân đó</li>
        <li>Các cơ quan Pháp luật Việt Nam có thẩm quyền</li>
        <li>
          Các đối tác hoạt động liên quan đến giao dịch của bạn, chẳng hạn như
          đơn vị vận chuyển.
        </li>
      </ul>
    ),
  },
  {
    title: "V. ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP VÀ QUẢN LÝ THÔNG TIN CÁ NHÂN",
    content: (
      <>
        Địa chỉ: 12 Hoang Hoa Tham, Quan 3, TP.HCM.
        <br />
        Hotline:{" "}
        <a href="tel:033678915" className="text-pink-600 font-bold">
          033678915
        </a>
        <br />
        Email:{" "}
        <a
          href="mailto:ntrang21102005@gmail.com"
          className="text-blue-600 underline"
        >
          ntrang21102005@gmail.com
        </a>
      </>
    ),
  },
  {
    title:
      "VI. PHƯƠNG TIỆN VÀ CÔNG CỤ ĐỂ NGƯỜI DÙNG TIẾP CẬN VÀ CHỈNH SỬA DỮ LIỆU CÁ NHÂN CỦA MÌNH",
    content: (
      <>
        Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông
        tin cá nhân của mình bằng cách đăng nhập hệ với ban quản trị website
        thực hiện việc này.
        <br />
        <br />
        Thành viên có quyền gửi khiếu nại về nội dung bảo mật thông tin đề nghị
        liên hệ Ban quản trị của website. Khi tiếp nhận những phản hồi này,
        chúng tôi sẽ xác nhận lại thông tin, trường hợp đúng như phản ánh của
        thành viên tùy theo mức độ, chúng tôi sẽ có những biện pháp xử lý kịp
        thời.
      </>
    ),
  },
  {
    title: "VII. CƠ CHẾ TIẾP NHẬN VÀ GIẢI QUYẾT KHIẾU NẠI CỦA NGƯỜI TIÊU DÙNG",
    content: (
      <>
        Khi phát hiện thông tin cá nhân của mình bị sử dụng sai mục đích hoặc
        phạm vi, khách hàng gửi email khiếu nại đến email info@scarab.vn hoặc
        gọi điện thoại tới số{" "}
        <span className="text-pink-600 font-bold">0908678983</span> để khiếu nại
        và cung cấp chứng cứ liên quan tới vụ việc cho Ban quản trị. Ban quản
        trị cam kết sẽ phản hồi ngay lập tức hoặc muộn nhất là trong vòng 24 giờ
        làm việc kể từ thời điểm nhận được khiếu nại.
        <br />
        <br />
        <ul className="list-disc pl-6">
          <li>
            Mọi tranh chấp phát sinh giữa Công ty và Người dùng sẽ được giải
            quyết trên cơ sở thương lượng. Trường hợp không đạt được thỏa thuận
            như mong muốn, một trong hai bên có quyền đưa vụ việc ra Tòa án nhân
            dân có thẩm quyền để giải quyết.
          </li>
          <li>
            Khi không giải quyết được qua thương lượng, hòa giải như trên, bên
            bị vi phạm tập hợp các chứng cứ như email, tin nhắn ... và liên lạc
            với Công ty. Công ty sẽ liên lạc lại với người khiếu nại để giải
            quyết.
          </li>
          <li>
            Nếu vụ việc vượt quá thẩm quyền của mình, Công ty sẽ đề nghị chuyển
            vụ việc cho các cơ quan chức năng có thẩm quyền. Trong trường hợp
            này, Công ty vẫn phối hợp hỗ trợ để bảo vệ tốt nhất bên bị vi phạm.
          </li>
        </ul>
        <br />
        Thông tin cá nhân của thành viên được cam kết bảo mật tuyệt đối theo
        chính sách bảo vệ thông tin cá nhân của website. Việc thu thập và sử
        dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý
        của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
        <br />
        Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào
        về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ
        thành viên.
        <br />
        <br />
        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến
        mất mát dữ liệu cá nhân thành viên, chúng tôi sẽ có trách nhiệm thông
        báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo
        cho thành viên được biết.
        <br />
        Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của thành viên bao
        gồm thông tin hóa đơn kế toán chứng từ số hóa.
        <br />
        Ban quản lý yêu cầu các cá nhân khi đăng ký/mua hàng phải cung cấp đầy
        đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc,
        email, điện thoại,… và chịu trách nhiệm về tính pháp lý của những thông
        tin trên. Ban quản lý không chịu trách nhiệm cũng như không giải quyết
        mọi khiếu nại có liên quan đến quyền lợi của thành viên đó nếu xét thấy
        tất cả các thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban
        đầu là không chính xác.
      </>
    ),
  },
];

const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto my-12 bg-white p-7 rounded-2xl shadow-lg border text-gray-900">
    <h2 className="font-bold text-xl mb-4">Chính sách bảo mật</h2>
    <div className="space-y-6 text-[15px] leading-relaxed">
      {data.map((item, idx) => (
        <div key={idx}>
          <div className="font-semibold mb-1">{item.title}</div>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  </div>
);

export default PrivacyPolicy;
