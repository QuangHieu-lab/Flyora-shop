import React from "react";

const DeliveryPolicy = () => (
  <div className="max-w-3xl mx-auto my-12 bg-white p-7 rounded-2xl shadow-lg border text-gray-900">
    <h2 className="font-bold text-xl mb-4">Chính sách giao hàng</h2>
    <div className="space-y-5 text-[15px] leading-relaxed">
      <div>
        <div className="font-semibold mb-1">1. Các phương thức giao hàng</div>
        <p>
          Chúng tôi sử dụng 02 phương thức giao hàng:
          <br />– Khách hàng mua trực tiếp hàng tại công ty, cửa hàng của chúng
          tôi
          <br />– Ship hàng
        </p>
      </div>
      <div>
        <div className="font-semibold mb-1">
          2. Thời hạn ước tính cho việc giao hàng
        </div>
        <p>
          Thông thường sau khi nhận được thông tin đặt hàng chúng tôi sẽ xử lý
          đơn hàng trong vòng 24h và phản hồi lại thông tin cho khách hàng về
          việc thanh toán và giao nhận.
          <br />
          Thời gian giao hàng thường trong khoảng từ 3-5 ngày kể từ ngày chốt
          đơn hàng hoặc theo thỏa thuận với khách khi đặt hàng.
        </p>
        <p className="mt-2">
          Tuy nhiên, cũng có trường hợp việc giao hàng kéo dài hơn nhưng chỉ xảy
          ra trong những tình huống bất khả kháng như sau:
          <ul className="list-disc pl-6">
            <li>
              Nhân viên chúng tôi liên lạc với khách hàng qua điện thoại không
              được nên không thể giao hàng.
            </li>
            <li>
              Địa chỉ giao hàng bạn cung cấp không chính xác hoặc khó tìm.
            </li>
            <li>
              Số lượng đơn hàng tăng đột biến khiến việc xử lý đơn hàng bị chậm.
            </li>
            <li>
              Đối tác cung cấp hàng chậm hơn dự kiến khiến việc giao hàng bị
              chậm lại hoặc đối tác vận chuyển giao hàng bị chậm
            </li>
          </ul>
        </p>
        <p className="mt-2">
          Về phí vận chuyển, chúng tôi sử dụng dịch vụ vận chuyển ngoài nên cước
          phí vận chuyển sẽ được tính theo phí của các đơn vị vận chuyển tùy vào
          vị trí và khối lượng của đơn hàng, khi liên hệ lại xác nhận đơn hàng
          với khách sẽ báo mức phí cụ thể cho khách hàng.
        </p>
      </div>
      <div>
        <div className="font-semibold mb-1">
          3. Các giới hạn về mặt địa lý cho việc giao hàng
        </div>
        <p>
          Riêng khách tỉnh có nhu cầu mua số lượng lớn hoặc khách buôn, nếu có
          nhu cầu mua sản phẩm, chúng tôi sẽ nhờ dịch vụ giao nhận của các công
          ty vận chuyển và phí sẽ được tính theo phí của các đơn vị cung cấp
          dịch vụ vận chuyển theo thỏa thuận hợp đồng giữa 2 bên.
        </p>
      </div>
      <div>
        <div className="font-semibold mb-1">
          4. Phân định trách nhiệm của thương nhân, tổ chức cung ứng dịch vụ
          logistics về cung cấp chứng từ hàng hóa trong quá trình giao nhận
        </div>
        <p>
          Tất cả các đơn hàng đều được đóng gói sẵn sàng trước khi vận chuyển,
          được niêm phong bởi{" "}
          <a
            href="https://flyora-frontend.vercel.app/"
            className="text-blue-600 underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flyora.vn
          </a>
          .<br />
          Bên{" "}
          <a
            href="https://flyora-frontend.vercel.app/"
            className="text-blue-600 underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flyora.vn
          </a>{" "}
          là bên cung cấp hóa đơn bán hàng khi giao hàng cho người mua.
        </p>
        <p className="mt-2">
          Đơn vị vận chuyển sẽ chỉ chịu trách nhiệm vận chuyển hàng hóa theo
          nguyên tắc “nguyên đai, nguyên kiện”.
          <br />
          Trên bao bì tất cả các đơn hàng đều có thông tin: Thông tin Người
          nhận, Số điện thoại và địa chỉ người nhận. Mã vận đơn của đơn hàng.
        </p>
        <p className="mt-2">
          Để đảm bảo an toàn cho hàng hóa,{" "}
          <a
            href="https://flyora-frontend.vercel.app/"
            className="text-blue-600 underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flyora.vn
          </a>{" "}
          sẽ gửi kèm hóa đơn tài chính hoặc phiếu xuất kho hợp lệ của sản phẩm
          trong bưu kiện (nếu có).
          <br />
          Hóa đơn tài chính hoặc phiếu xuất kho là căn cứ hỗ trợ quá trình xử lý
          khiếu nại như: xác định giá trị thị trường của hàng hóa, đảm bảo hàng
          hóa lưu thông hợp lệ v.v..
        </p>
        <div className="mt-2">
          <span className="font-semibold">Nghĩa vụ của bên vận chuyển:</span>
          <ul className="list-disc pl-6">
            <li>
              Bên vận chuyển có trách nhiệm cung cấp chứng từ hàng hóa khi giao
              hàng từ bên thuê vận chuyển.
            </li>
            <li>
              Bảo đảm vận chuyển đầy đủ hàng hoá, an toàn đến địa điểm đã định,
              theo đúng thời hạn.
            </li>
            <li>Giao hàng hoá cho người có quyền nhận.</li>
            <li>
              Các chi phí liên quan đến việc chuyển chở hàng hoá thanh toán theo
              thỏa thuận.
            </li>
            <li>
              Bồi thường thiệt hại cho bên thuê vận chuyển trong trường hợp bên
              vận chuyển để mất, hư hỏng hàng hoá, trừ trường hợp có thỏa thuận
              khác hoặc pháp luật có quy định khác.
            </li>
            <li>
              Kiểm tra sự xác thực của hàng hoá, của vận đơn hoặc chứng từ vận
              chuyển tương đương khác.
            </li>
            <li>
              Từ chối vận chuyển hàng hoá không đúng với loại tài sản đã thỏa
              thuận trong hợp đồng.
            </li>
            <li>
              Yêu cầu bên thuê vận chuyển thanh toán đủ cước phí vận chuyển đúng
              thời hạn.
            </li>
            <li>
              Từ chối vận chuyển hàng hoá cấm giao dịch, hàng hoá có tính chất
              nguy hiểm, độc hại.
            </li>
          </ul>
        </div>
        <div className="mt-2">
          <span className="font-semibold">
            Nghĩa vụ của bên thuê vận chuyển:
          </span>
          <ul className="list-disc pl-6">
            <li>
              Trả đủ tiền cước phí vận chuyển cho bên vận chuyển theo đúng thời
              hạn, phương thức đã thỏa thuận.
            </li>
            <li>
              Cung cấp thông tin cần thiết liên quan đến hàng hoá vận chuyển để
              đảm bảo an toàn cho hàng hoá vận chuyển.
            </li>
            <li>
              Yêu cầu bên vận chuyển chuyên chở hàng hoá đến đúng địa điểm, thời
              điểm đã thỏa thuận.
            </li>
            <li>
              Trực tiếp hoặc chỉ định người thứ ba nhận lại hàng hoá đã thuê vận
              chuyển.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="font-semibold mb-1">
          5. Trách nhiệm về trường hợp hàng bị hư hỏng do quá trình vận chuyển
        </div>
        <p>
          Về việc cung cấp chứng từ hàng hóa trong quá trình giao nhận.
          <br />
          Đối với hàng hóa bị hư hỏng do quá trình vận chuyển dù là đơn hàng do
          chính cửa hàng vận chuyển hay do bên thứ 3 vận chuyển thì chúng tôi sẽ
          là bên đứng ra chịu trách nhiệm giải quyết vấn đề cho khách hàng.
          <br />
          Khách hàng có quyền từ chối nhận sản phẩm và yêu cầu đổi trả theo quy
          định “đổi trả hoàn phí” còn mọi vấn đề phát sinh chúng tôi sẽ làm việc
          lại với đối tác vận chuyển để giải quyết đến bù cho đơn hàng theo thỏa
          thuận hợp tác giữa công ty với đối tác thứ 3 cung cấp dịch vụ vận
          chuyển.
        </p>
        <p className="mt-2 text-red-600 font-medium">
          Lưu ý: Trường hợp phát sinh chậm trễ trong việc giao hàng chúng tôi sẽ
          thông tin kịp thời cho khách hàng và khách hàng có thể lựa chọn giữa
          việc Hủy hoặc tiếp tục chờ hàng.
        </p>
      </div>
    </div>
  </div>
);

export default DeliveryPolicy;
