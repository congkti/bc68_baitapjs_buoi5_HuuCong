

// ===> Bài 2: Tính Tiền Điện
/** Sơ đồ 3 khối
 *
 * 1. Đầu vào: Khách hàng nhập chỉ SỐ điện cũ và mới, và thông tin khách hàng
 *
 *
 * 2. Xử lý:
 *  - Tách hàm tính tiền điện riêng để dễ update giá tiền sau này:
 *    (hàm truyền vào số điện tiêu thụ và trả về kết quả là tổng tiền tương ứng số điện tiêu thụ (chưa VAT))
 *  - Dùng điều kiện if else ... để tính tiền điện theo thang bậc sau:
 *    + Bậc 1: 50kwh đầu: đơn giá 500đ/kwh - <= 50
 *    + Bậc 2: 50kwh kế tiếp: đơn giá 650đ/kwh - <= 100
 *    + Bậc 3: 100kwh kế tiếp: đơn giá 850đ/kwh - <= 200
 *    + Bậc 4: 150kwh lế tiếp: đơn giá 1.100đ/kwh - <= 350
 *    + Bậc 5: trên 350kwh: đơn giá 1.300đ/kwh - >350
 * => Tổng tiền
 *  - DOM đến button tính tiền > gắn sự kiện onclick
 *  - DOM đến các element liên quan để lấy thông tin khách nhập
 *  - Xử lý dữ liệu đầu vào đúng mới cho chạy hàm:
 *    + Input chỉ số cũ + mới có type="number"
 *    + Chỉ số cũ >= 0 && mới > cũ
 *  - Tính số điện tiêu thụ của khách <số điện tiêu thụ> = <chỉ số mới> - <chỉ số cũ>
 *  - Chạy hàm tính tiền: truyền <số điện tiêu thụ> => Tổng tiền => Tổng thanh toán
 *  - Viết function để in bill tính tiền cho khách
 *
 *
 * 3. Đầu ra:
 *  - Hiển thị kết quả tính tiền lên giao diện
 *  - chạy ra lệnh in bill tới máy in
 *
 */

const VAT = 10; // update thuế VAT %
const tinhTienDien = (soDienTieuThu) => {
  let tongTien = 0;
  if (soDienTieuThu <= 50) {
    //bậc 1
    tongTien = soDienTieuThu * 500;
  } else if (soDienTieuThu <= 100) {
    //bậc 2
    tongTien = 50 * 500 + (soDienTieuThu - 50) * 650;
  } else if (soDienTieuThu <= 200) {
    //bậc 3
    tongTien = 50 * 500 + 50 * 650 + (soDienTieuThu - 100) * 850;
  } else if (soDienTieuThu <= 350) {
    // bậc 4
    tongTien = 50 * 500 + 50 * 650 + 100 * 850 + (soDienTieuThu - 200) * 1100;
  } else {
    // bậc 5
    tongTien =
      50 * 500 +
      50 * 650 +
      100 * 850 +
      150 * 1100 +
      (soDienTieuThu - 350) * 1300;
  }
  return tongTien;
};
// .toLocaleString( "vi", {style: "currency", currency: "VND"})
console.log(
  tinhTienDien(352).toLocaleString("vi", { style: "currency", currency: "VND" })
);
// kiểm tra form nhập
const checkFormTienDien = () => {
  let chiSoCu = parseInt(document.getElementById("chiSoCu").value);
  let chiSoMoi = parseInt(document.getElementById("chiSoMoi").value);
  if (isNaN(chiSoCu) || isNaN(chiSoMoi)) {
    alert(`Chưa nhập chỉ số điện cũ/mới`);
    return false;
  } else if (chiSoCu < 0 || chiSoMoi < 0) {
    alert(`Chỉ số cũ (${chiSoCu}) và mới (${chiSoMoi}) không được nhập số âm`);
    return false;
  } else if (chiSoMoi <= chiSoCu) {
    alert(`Chỉ số mới (${chiSoMoi}) phải hơn chỉ số cũ (${chiSoCu})`);
    return false;
  } else {
    return true;
  }
};

// click tính tiền
document.getElementById("btnTinhTien").addEventListener("click", () => {
  if (checkFormTienDien()) {
    let chiSoCu = parseInt(document.getElementById("chiSoCu").value);
    let chiSoMoi = parseInt(document.getElementById("chiSoMoi").value);
    let soDienTieuThu = chiSoMoi - chiSoCu;
    let tongTien = tinhTienDien(soDienTieuThu);
    alert(tongTien);
  }
});
