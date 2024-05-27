/*  =================================
 *   | Bài tập js buổi 5             |
 *   | Handler: Bùi Hữu Công         |
 *   =================================*/

// ===[global function]======
// ẩn element
function hideElement(selector) {
  let el = document.querySelector(selector);
  el.style.display = "none";
  el.style.opacity = "0";
}
// hiện element block & inline-block
function showBlock(selector) {
  let el = document.querySelector(selector);
  el.style.display = "block";
  el.style.opacity = "1";
}
function showBlockInline(selector) {
  let el = document.querySelector(selector);
  el.style.display = "inline-block";
  el.style.opacity = "1";
}
// xóa form input
function xoaForm(selector) {
  let els = document.querySelectorAll(selector);
  let i = 0;
  while (i < els.length) {
    els[i].value = "";
    i++;
  }
}
// .toLocaleString( "vi", {style: "currency", currency: "VND"})
// .toLocaleString( "vi")
// hàm format tiền VND
function vnd(num) {
  return (num = num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  }));
}
// format vn number
function vnNum(num) {
  return (num = num.toLocaleString("vi-VN"));
}
function nhapBill(idNhap, NoiDungNhap) {
  document.getElementById(idNhap).innerHTML = NoiDungNhap;
}
// ======end global fn

/**=============================
 * BÀI TẬP 1: QUẢN LÝ TUYỂN SINH
 * - Thí sinh trúng tuyển nếu có điểm tổng kết >= điểm chuẩn &&  không có môn 0 điểm
 * - Điểm tổng = Tổng điểm 3 môn + Điểm ưu tiên
 * - Điểm ưu tiên tính theo khu vực và đối tượng:
 *  + Khu vực: A: 2 điểm | B: 1 điểm | C: 0.5 điểm
 *  + Đối tượng: 1: 2.5 điểm | 2: 1.5 điểm | 3: 1 điểm
 * ==============================
 *   Sơ đồ 3 khối
 *
 * 1. Đầu vào:
 * - Người dùng nhập vào Điểm chuẩn của hội đồng + Điểm thi 3 môn + Đối tượng ưu tiên + Khu vực ưu tiên.
 *
 *
 * 2. Xử lý:
 * - Bước 1: DOM đến button tính điểm để gắn sự kiện click --> Sau đó DOM tới các đối tượng để lấy dữ liệu liên quan.
 * - Bước 2: Kiểm tra dữ liệu trước khi tính:
 *   + Điểm thi 3 môn: là số >=0, không nhập hiểu là = 0.
 *  !!! Nếu có ít nhất 1 trong 3 môn điểm bằng 0 thì trả ngay về kết quả "thi rớt" và dừng chương trình.
 *   + Điểm chuẩn: bắt buộc nhập và là number > 0
 *   + Khu vực ưu tiên: mặc định không nhập là không thuộc khu vực ưu tiên (điểm cộng = 0)
 *   + Đối tượng ưu tiên: mặc định không nhập là không thuộc đối tượng ưu tiên (điểm cộng = 0)
 * - Bước 3: Tính điểm ưu tiên theo khu vực và đối tượng:
 *  + Khu vực: A: 2 điểm | B: 1 điểm | C: 0.5 điểm
 *  + Đối tượng: 1: 2.5 điểm | 2: 1.5 điểm | 3: 1 điểm
 * - Bước 3: Tính Tổng Điểm = [Tổng điểm 3 môn]+[Điểm Khu vực ưu tiên]+[Điểm đối tượng Ưu tiên]
 * - Bước 4: So sánh với Điểm chuẩn để ra kết quả thi:
 *   + Nếu >= điểm chuẩn -> Đậu;
 *   + Nếu < điểm chuẩn -> Rớt
 *
 *
 * 3. Đầu ra:  Hiển thị kết quả lên giao diện
 *
 */
// khai báo tham số chung
const KHU_VUC_DF = "kv0";
const KHU_VUC_A = "kvA";
const KHU_VUC_B = "kvB";
const KHU_VUC_C = "kvC";

const DOI_TUONG_DF = "dt0";
const DOI_TUONG_I = "dtI";
const DOI_TUONG_II = "dtII";
const DOI_TUONG_III = "dtIII";

const layDiemKhuVuc = (khuVuc) => {
  switch (khuVuc) {
    case KHU_VUC_A:
      return 2;
    case KHU_VUC_B:
      return 1;
    case KHU_VUC_C:
      return 0.5;
    case KHU_VUC_DF:
      return 0;
  }
};
const layDiemDoiTuong = (doiTuong) => {
  switch (doiTuong) {
    case DOI_TUONG_I:
      return 2.5;
    case DOI_TUONG_II:
      return 1.5;
    case DOI_TUONG_III:
      return 1;
    case DOI_TUONG_DF:
      return 0;
  }
};

document.getElementById("btnKetQuaThi").addEventListener("click", () => {
  console.log("click btn");
  let diemChuan = document.getElementById("diemChuan").value * 1;
  let khuVuc = document.getElementById("khuVucUuTien").value;
  let doiTuong = document.getElementById("doiTuongUuTien").value;
  let diemThi1 = document.getElementById("diemThi1").value * 1;
  let diemThi2 = document.getElementById("diemThi2").value * 1;
  let diemThi3 = document.getElementById("diemThi3").value * 1;
  let diemKhuVuc = layDiemKhuVuc(khuVuc);
  let diemDoiTuong = layDiemDoiTuong(doiTuong);
  let rsBai1 = document.getElementById("rsBai1");
  console.log(
    diemChuan,
    khuVuc,
    diemKhuVuc,
    doiTuong,
    diemDoiTuong,
    diemThi1,
    diemThi2,
    diemThi3
  );
  if (diemThi1 == 0 || diemThi2 == 0 || diemThi3 == 0) {
    rsBai1.innerHTML = `
        <h4 class="interface red red-border">
          Bạn đã thi RỚT, vì có điểm bằng 0
        </h4>
    `;
    showBlock("#rsBai1");
  } else if (diemChuan <= 0) {
    alert("Nhập điểm chuẩn của hội đồng thi, là số > 0");
    document.getElementById("diemChuan").focus();
    return;
  } else {
    let tongDiemThi = diemThi1 + diemThi2 + diemThi3;
    let diemTongKet = tongDiemThi + diemKhuVuc + diemDoiTuong;
    if (diemTongKet < diemChuan) {
      rsBai1.innerHTML = `
        <h4 class="interface red red-border">
          Bạn đã thi RỚT!
        </h4>
        <p class="text-center mt-5">
          Tổng điểm các môn: ${tongDiemThi} điểm <br />
          Tổng điểm ưu tiên: ${diemKhuVuc + diemDoiTuong} điểm <br />
          <strong>Điểm tổng kết: ${diemTongKet} điểm</strong><br />
          <span class="interface red">Điểm chuẩn: ${diemChuan} điếm</span>
        </p>
    `;
    } else {
      rsBai1.innerHTML = `
        <h4 class="interface green green-border">
          Xin chúc mừng! Bạn đã thi ĐẬU
        </h4>
        <p class="text-center mt-5">
          Tổng điểm các môn: ${tongDiemThi} điểm <br />
          Tổng điểm ưu tiên: ${diemKhuVuc + diemDoiTuong} điểm <br />
          <strong>Điểm tổng kết: ${diemTongKet} điểm</strong><br />
          <span class="interface red">Điểm chuẩn: ${diemChuan} điếm</span>
        </p>
    `;
    }
    showBlock("#rsBai1");
  }
});
document.getElementById("btnXoaFormBaiTap1").addEventListener("click", () => {
  hideElement("#rsBai1");
});

/** ===============================
 *   BÀI TẬP 2: TÍNH TIỀN ĐIỆN
 * ================================
 *   Sơ đồ 3 khối
 *
 * 1. Đầu vào: Người dùng nhập chỉ SỐ điện cũ và mới, và thông tin khách hàng
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

// Setting tham số đầu vào
const VAT = 10; // update thuế VAT (%)
//Bảng giá tiền điện theo thang bậc 1-> 5 - đơn vị đ/kwh
const DG_BAC_1 = 500; // đơn giá bậc 1
const DG_BAC_2 = 650; // đơn giá bậc 2
const DG_BAC_3 = 850; // đơn giá bậc 3
const DG_BAC_4 = 1100; // đơn giá bậc 4
const DG_BAC_5 = 1300; // đơn giá bậc 5

const tinhTienDien = (soDienTieuThu) => {
  let tongTien = 0;
  if (soDienTieuThu <= 50) {
    //bậc 1
    tongTien = soDienTieuThu * DG_BAC_1;
  } else if (soDienTieuThu <= 100) {
    //bậc 2
    tongTien = 50 * DG_BAC_1 + (soDienTieuThu - 50) * DG_BAC_2;
  } else if (soDienTieuThu <= 200) {
    //bậc 3
    tongTien = 50 * DG_BAC_1 + 50 * DG_BAC_2 + (soDienTieuThu - 100) * DG_BAC_3;
  } else if (soDienTieuThu <= 350) {
    // bậc 4
    tongTien =
      50 * DG_BAC_1 +
      50 * DG_BAC_2 +
      100 * DG_BAC_3 +
      (soDienTieuThu - 200) * DG_BAC_4;
  } else {
    // bậc 5
    tongTien =
      50 * DG_BAC_1 +
      50 * DG_BAC_2 +
      100 * DG_BAC_3 +
      150 * DG_BAC_4 +
      (soDienTieuThu - 350) * DG_BAC_5;
  }
  return tongTien;
};
console.log(vnd(tinhTienDien(352)));

// kiểm tra form nhập
const checkFormTienDien = () => {
  let chiSoCu = parseInt(document.getElementById("chiSoCu").value);
  let chiSoMoi = parseInt(document.getElementById("chiSoMoi").value);
  if (isNaN(chiSoCu) || isNaN(chiSoMoi)) {
    alert(`Chưa nhập chỉ số điện cũ/mới`);
    document.getElementById("chiSoCu").focus();
    return false;
  } else if (chiSoCu < 0 || chiSoMoi < 0) {
    alert(`Chỉ số cũ (${chiSoCu}) và mới (${chiSoMoi}) không được nhập số âm`);
    document.getElementById("chiSoCu").focus();
    return false;
  } else if (chiSoMoi <= chiSoCu) {
    alert(`Chỉ số mới (${chiSoMoi}) phải lớn hơn chỉ số cũ (${chiSoCu})`);
    document.getElementById("chiSoMoi").focus();
    return false;
  } else {
    return true;
  }
};

// click tính tiền
document.getElementById("btnTinhTien").addEventListener("click", () => {
  hideElement(".rightSide .inBill");
  setTimeout(() => {
    if (checkFormTienDien()) {
      let chiSoCu = document.getElementById("chiSoCu").value * 1;
      let chiSoMoi = document.getElementById("chiSoMoi").value * 1;
      let soDienTieuThu = chiSoMoi - chiSoCu;
      let tongTien = tinhTienDien(soDienTieuThu);
      let vat = (tongTien * VAT) / 100;
      document.getElementById("soDienTieuThu").innerText = vnNum(soDienTieuThu);
      document.getElementById("thanhTien").innerText = vnd(tongTien);

      document.getElementById("vat").innerText = vnd(vat);
      document.getElementById("tongThanhToan").innerText = vnd(
        Math.round(tongTien + vat)
      );
      showBlockInline("#btnPrintBill");
    }
  }, 100);
});

// click xóa form
document.getElementById("btnResetBai2").addEventListener("click", () => {
  xoaForm("#v-pills-baitap2 input");
  hideElement("#btnPrintBill");
  hideElement(".rightSide .inBill");
});

// click in bill
document.getElementById("btnPrintBill").addEventListener("click", () => {
  let tenKhachHang = document.getElementById("tenKhachHang").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!tenKhachHang || !phone || !address) {
    alert("Bạn cần nhập thông tin khách hàng đầy đủ trước khi in!");
    document.getElementById("tenKhachHang").focus();
    return;
  }

  let ngayInBill = new Date().toLocaleString("vi-VN", {
    timeStyle: "medium",
    dateStyle: "short",
  });
  let chiSoCu = document.getElementById("chiSoCu").value * 1;
  let chiSoMoi = document.getElementById("chiSoMoi").value * 1;
  let soDienTieuThu = chiSoMoi - chiSoCu;

  let soDienBac1 = 0;
  let soDienBac2 = 0;
  let soDienBac3 = 0;
  let soDienBac4 = 0;
  let soDienBac5 = 0;

  let thanhTienBac1 = 0;
  let thanhTienBac2 = 0;
  let thanhTienBac3 = 0;
  let thanhTienBac4 = 0;
  let thanhTienBac5 = 0;

  if (soDienTieuThu <= 50) {
    //bậc 1
    soDienBac1 = soDienTieuThu;
    thanhTienBac1 = soDienBac1 * DG_BAC_1;
  } else if (soDienTieuThu <= 100) {
    //bậc 2
    soDienBac1 = 50;
    soDienBac2 = soDienTieuThu - 50;
    thanhTienBac1 = soDienBac1 * DG_BAC_1;
    thanhTienBac2 = soDienBac2 * DG_BAC_2;
  } else if (soDienTieuThu <= 200) {
    //bậc 3
    soDienBac1 = 50;
    soDienBac2 = 50;
    soDienBac3 = soDienTieuThu - 100;
    thanhTienBac1 = soDienBac1 * DG_BAC_1;
    thanhTienBac2 = soDienBac2 * DG_BAC_2;
    thanhTienBac3 = soDienBac3 * DG_BAC_3;
  } else if (soDienTieuThu <= 350) {
    // bậc 4
    soDienBac1 = 50;
    soDienBac2 = 50;
    soDienBac3 = 100;
    soDienBac4 = soDienTieuThu - 200;
    thanhTienBac1 = soDienBac1 * DG_BAC_1;
    thanhTienBac2 = soDienBac2 * DG_BAC_2;
    thanhTienBac3 = soDienBac3 * DG_BAC_3;
    thanhTienBac4 = soDienBac4 * DG_BAC_4;
  } else {
    // bậc 5
    soDienBac1 = 50;
    soDienBac2 = 50;
    soDienBac3 = 100;
    soDienBac4 = 150;
    soDienBac5 = soDienTieuThu - 350;
    thanhTienBac1 = soDienBac1 * DG_BAC_1;
    thanhTienBac2 = soDienBac2 * DG_BAC_2;
    thanhTienBac3 = soDienBac3 * DG_BAC_3;
    thanhTienBac4 = soDienBac4 * DG_BAC_4;
    thanhTienBac5 = soDienBac5 * DG_BAC_5;
  }

  let tongTien =
    thanhTienBac1 +
    thanhTienBac2 +
    thanhTienBac3 +
    thanhTienBac4 +
    thanhTienBac5;
  let vat = (tongTien * VAT) / 100;
  let tongThanhToan = Math.round(tongTien + vat);
  console.log(tongTien, vat, tongThanhToan);
  // nhập bill
  nhapBill("dateBill", `(Ngày in: ${ngayInBill})`);
  nhapBill(
    "billCusInfo",
    `
      - Khách hàng: <strong>${tenKhachHang}</strong> - Điện thoại:
      <strong>${phone}</strong><br />
      - Địa chỉ: ${address}<br />
      - Chỉ số cũ: ${vnNum(chiSoCu)} kwh<br />
      - Chỉ số mới: ${vnNum(chiSoMoi)} kwh<br />
      - Tổng số điện tiêu thụ: ${vnNum(soDienTieuThu)} kwh
  `
  );
  // nhập tbody
  nhapBill(
    "billBodyTblBai1",
    `
      <tr>
        <td>Bậc 1: từ 0 - 50 <small>kwh</small></td>
        <td>${soDienBac1} <small>kwh</small></td>
        <td>${vnNum(DG_BAC_1)} <small>đ/kwh</small></td>
        <td>${vnd(thanhTienBac1)}</td>
      </tr>
      <tr>
        <td>Bậc 2: từ 51 - 100 <small>kwh</small></td>
        <td>${soDienBac2} <small>kwh</small></td>
        <td>${vnNum(DG_BAC_2)} <small>đ/kwh</small></td>
        <td>${vnd(thanhTienBac2)}</td>
      </tr>
      <tr>
        <td>Bậc 3: từ 101 - 200 <small>kwh</small></td>
        <td>${soDienBac3} <small>kwh</small></td>
        <td>${vnNum(DG_BAC_3)} <small>đ/kwh</small></td>
        <td>${vnd(thanhTienBac3)}</td>
      </tr>
      <tr>
        <td>Bậc 4: từ 201 - 350 <small>kwh</small></td>
        <td>${soDienBac4} <small>kwh</small></td>
        <td>${vnNum(DG_BAC_4)} <small>đ/kwh</small></td>
        <td>${vnd(thanhTienBac4)}</td>
      </tr>
      <tr>
        <td>Bậc 5: trên 350 <small>kwh</small></td>
        <td>${soDienBac5} <small>kwh</small></td>
        <td>${vnNum(DG_BAC_5)} <small>đ/kwh</small></td>
        <td>${vnd(thanhTienBac5)}</td>
      </tr>
  `
  );

  // nhập tfoot

  document.querySelector("#billTienDien .billTongTien").innerHTML =
    vnd(tongTien);
  document.querySelector("#billTienDien .billThueVat").innerHTML = vnd(vat);
  document.querySelector("#billTienDien .billTongThanhToan").innerHTML =
    vnd(tongThanhToan);
  document.querySelector("#billTienDien .readNumber").innerHTML =
    VNnum2words(tongThanhToan) + " đồng";

  showBlock(".rightSide .inBill");
  // chạy lệnh in
  printContent(".rightSide .inBill"); //id phần tử cha của phần tử cần in
});

// Print content
function printContent(contentSelector) {
  // DOM tới phần tử contentSelector để lấy nội dung html của phần tử này
  // let content = document.getElementById(contentId).innerHTML;
  let content = document.querySelector(contentSelector).innerHTML;

  let printWindow = window.open(
    "",
    "",
    "width=800,height=1000,top=20,left=100"
  );

  printWindow.document.write("<html><head><title>In hóa đơn</title>");
  printWindow.document.write("<link rel='stylesheet' href='./css/print5.css'>");
  printWindow.document.write("</head><body >");
  printWindow.document.write(
    "<div class='w-100 p-3 m-0'>" + content + "</div>"
  );
  printWindow.document.write(
    "<button class='btn btn-dark mx-3' id='clickPrint'>Print</button></body></html>"
  );
  // chờ load hoàn chỉnh mới chạy lệnh in
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 1000);

  printWindow.document
    .getElementById("clickPrint")
    .addEventListener("click", () => {
      printContent(".rightSide .inBill"); //id phần tử cha của phần tử cần in
    });
}

/**======================================
 * BÀI TẬP 3: TÍNH THUẾ THU NHẬP CÁ NHÂN
 * ======================================
 *   Sơ đồ 3 khối
 *
 * 1. Đầu vào: Người dùng nhập vào Tên, Số người phụ thuộc và Tổng thu nhập năm (12 tháng)
 *
 *
 * 2. Xử lý:
 * - DOM đến nút tính tiền và gắn sự kiện click
 * - DOM đến các đối tượng để lấy dữ liệu liên quan:
 *   Tên, Số người phụ thuộc, Tổng thu nhập năm
 * - Kiểm tra dữ liệu: tổng thu nhập là số > 0, Số người phụ thuộc không nhập = 0 người
 * - Tính Tổng Thu nhập chịu thuế:
 *   Tổng TNCT = Tổng TN năm - (4tr + Số người phụ thuộc x 1.6tr) x 12 tháng
 * - So sánh Tổng TNCT theo thang bậc quy định để ra % chịu thuế => thuế phải đóng lũy tiến theo từng bậc:
 *  + Bậc 1: 0 < Tổng TNCT <= 60tr => Thuế suất 5%
 *    => [ Tiền thuế = TNCT x 5% ]
 *  + Bậc 2: 60tr < Tổng TNCT <= 120tr => thuế 10%
 *    => [ Tiền thuế = tiền thuế MAX bậc 1 + (TNCT-60)x10% ]
 *  + Bậc 3: 120tr < Tổng TNCT <= 210tr => thuế 15%
 *    => [ Tiền thuế = tiền thuế MAX bậc 1 & 2 + (TNCT-120)x15% ]
 *  + Bậc 4: 210tr < Tổng TNCT <= 384tr => thuế 20%
 *    => [ Tiền thuế = tiền thuế MAX bậc 1 & 2 & 3 + (TNCT-210)x20% ]
 *  + Bậc 5: 384tr < Tổng TNCT <= 624tr => thuế 25%
 *    => [ Tiền thuế = tiền thuế MAX bậc 1 & 2 & 3 & 4 + (TNCT-384)x25% ]
 *  + Bậc 6: 624tr < Tổng TNCT <= 960tr => thuế 30%
 *    => [ Tiền thuế = tiền thuế MAX bậc 1 & 2 & 3 & 4 & 5 + (TNCT-624)x30% ]
 *  + Bậc 7: 960tr < Tổng TNCT  => thuế 35%
 *    => [ Tiền thuế = tiền thuế MAX bậc 1 & 2 & 3 & 4 & 5 & 6 + (TNCT-960)x35% ]
 * - Tổng tiền phải nộp = Tiền thuế (bậc 1) + (bậc 2) + (bậc 3) + (bậc 4) + (bậc 5) + (bậc 6) + (bậc 7)
 *
 *
 * 3. Đầu ra:
 * - Hiện thị kết quả Tổng thuế phải nộp ra giao diện
 *
 */
// cập nhật số tiền hàng tháng cho bản thân và người phụ thuộc (đvt: triệu đồng)
const TIEN_CHO_CA_NHAN = 11;
const TIEN_CHO_NGUOI_PHU_THUOC = 3;

// cập nhật MAX thu nhập chịu thuế theo theo bậc quy định (đvt: triệu đồng)
const MAX_BAC1 = 60; // = Min Bậc 2
const MAX_BAC2 = 120; // = Min Bậc 3
const MAX_BAC3 = 210; // = Min Bậc 4
const MAX_BAC4 = 384; // = Min Bậc 5
const MAX_BAC5 = 624; // = Min Bậc 6
const MAX_BAC6 = 960; // = Min Bậc 7

// cập nhật thuế suất theo bậc (%)
const THUE_BAC1 = 5;
const THUE_BAC2 = 10;
const THUE_BAC3 = 15;
const THUE_BAC4 = 20;
const THUE_BAC5 = 25;
const THUE_BAC6 = 30;
const THUE_BAC7 = 35;

// hàm tính số tiền đóng thuế tối đa của từng bậc
const maxTienThueTheoBac = (minTheoBac, maxTheoBac, thueTheoBac) => {
  return (maxTheoBac - minTheoBac) * (thueTheoBac / 100);
};
let maxTienThueBac1 = maxTienThueTheoBac(0, MAX_BAC1, THUE_BAC1);
let maxTienThueBac2 = maxTienThueTheoBac(MAX_BAC1, MAX_BAC2, THUE_BAC2);
let maxTienThueBac3 = maxTienThueTheoBac(MAX_BAC2, MAX_BAC3, THUE_BAC3);
let maxTienThueBac4 = maxTienThueTheoBac(MAX_BAC3, MAX_BAC4, THUE_BAC4);
let maxTienThueBac5 = maxTienThueTheoBac(MAX_BAC4, MAX_BAC5, THUE_BAC5);
let maxTienThueBac6 = maxTienThueTheoBac(MAX_BAC5, MAX_BAC6, THUE_BAC6);

document.getElementById("btnTinhTienThue").addEventListener("click", () => {
  hideElement("#rsBai3");
  let nguoiDongThue = document.getElementById("tncnHoTen").value;
  let soNguoiPhuThuoc =
    document.getElementById("tncnSoNguoiPhuThuoc").value * 1;
  let tongThuNhapNam = document.getElementById("tongThuNhapNam").value * 1;

  if (tongThuNhapNam <= 0) {
    alert("Nhập tổng tiền thu nhập năm > 0");
    document.getElementById("tongThuNhapNam").focus();
    return false;
  } else {
    if (soNguoiPhuThuoc <= 0) {
      soNguoiPhuThuoc = 0;
      alert(`Số người phụ thuộc của bạn là: ${soNguoiPhuThuoc}`);
    }

    // bắt đầu tính
    // đơn vị tính: 1.000.000 đồng (1e6)
    tongThuNhapNam = tongThuNhapNam / 1e6;
    let thuNhapChiuThue =
      tongThuNhapNam -
      TIEN_CHO_CA_NHAN * 12 -
      soNguoiPhuThuoc * TIEN_CHO_NGUOI_PHU_THUOC * 12;
    let tongTienThue = 0;
    if (thuNhapChiuThue <= 0) {
      //ko đóng thuế
      nhapBill(
        "rsBai3",
        `
        <p class="mb-3 text-center">
          Chào bạn <strong>${nguoiDongThue}</strong>!<br />
          Thu nhập của bạn dưới mức thu nhập chịu thuế
        </p>
        <h4 class="text-center interface magenta magenta-border">
          Bạn không phải đóng thuế TNCN năm nay!
        </h4>
      `
      );
      showBlock("#rsBai3");
    } else {
      //thuNhapChiuThue > 0
      if (thuNhapChiuThue <= MAX_BAC1) {
        // bậc 1
        tongTienThue = thuNhapChiuThue * (THUE_BAC1 / 100);
      } else if (thuNhapChiuThue <= MAX_BAC2) {
        //bậc 2
        tongTienThue =
          maxTienThueBac1 + (thuNhapChiuThue - MAX_BAC1) * (THUE_BAC2 / 100);
      } else if (thuNhapChiuThue <= MAX_BAC3) {
        //bậc 3
        tongTienThue =
          maxTienThueBac1 +
          maxTienThueBac2 +
          (thuNhapChiuThue - MAX_BAC2) * (THUE_BAC3 / 100);
      } else if (thuNhapChiuThue <= MAX_BAC4) {
        //bậc 4
        tongTienThue =
          maxTienThueBac1 +
          maxTienThueBac2 +
          maxTienThueBac3 +
          (thuNhapChiuThue - MAX_BAC3) * (THUE_BAC4 / 100);
      } else if (thuNhapChiuThue <= MAX_BAC5) {
        //bậc 5
        tongTienThue =
          maxTienThueBac1 +
          maxTienThueBac2 +
          maxTienThueBac3 +
          maxTienThueBac4 +
          (thuNhapChiuThue - MAX_BAC4) * (THUE_BAC5 / 100);
      } else if (thuNhapChiuThue <= MAX_BAC6) {
        //bậc 6
        tongTienThue =
          maxTienThueBac1 +
          maxTienThueBac2 +
          maxTienThueBac3 +
          maxTienThueBac4 +
          maxTienThueBac5 +
          (thuNhapChiuThue - MAX_BAC5) * (THUE_BAC6 / 100);
      } else {
        //bậc 7 cuối
        tongTienThue =
          maxTienThueBac1 +
          maxTienThueBac2 +
          maxTienThueBac3 +
          maxTienThueBac4 +
          maxTienThueBac5 +
          maxTienThueBac6 +
          (thuNhapChiuThue - MAX_BAC6) * (THUE_BAC7 / 100);
      }
      // hiện kết quả case có đóng thuế
      nhapBill(
        "rsBai3",
        `
        <p class="mb-3 text-center">
          Chào bạn <strong>${nguoiDongThue}</strong>!<br />
          Tổng tiền thuế TNCN phải đóng năm nay của bạn là:
        </p>
        <h4 class="text-center interface magenta magenta-border">
          ${vnd(tongTienThue * 1e6)}
        </h4>
        <p class="text-center mt-4">
          Tổng thu nhập cả năm: ${vnd(tongThuNhapNam * 1e6)} <br />
          Tổng số người phụ thuộc: ${soNguoiPhuThuoc} người <br />
          (Tổng tiền cho người phụ thuộc: ${vnd(
            soNguoiPhuThuoc * TIEN_CHO_NGUOI_PHU_THUOC * 1e6 * 12
          )}) <br />
          <strong>Tổng thu nhập chịu thuế: ${vnd(
            thuNhapChiuThue * 1e6
          )}</strong><br />
        </p>
    `
      );
      showBlock("#rsBai3");
    } //eof else thuNhapChiuThue > 0
  } //eof tongThuNhapNam > 0
});

document.getElementById("btnXoaFormBaiTap3").addEventListener("click", () => {
  hideElement("#rsBai3");
});

/**==================================
 * BÀI TẬP 4: TÍNH TIỀN CÁP INTERNET
 * ==================================
 *   Sơ đồ 3 khối
 *
 * 1. Đầu vào:
 *
 *
 * 2. Xử lý:
 *
 *
 * 3. Đầu ra:
 */
