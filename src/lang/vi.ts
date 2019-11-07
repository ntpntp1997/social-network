export const transValidation = {
  full_name:
    "Username gioi han trong khoan 3 - 17 ky tu va khong duoc phep chua ky tu dac biet",
  email_incorrect: "Email phai co dang @gmail.com",
  gender_incorrect: "Ua tai sao truong gioi tinh lai bi sai ???",
  password_incorrect:
    "Mat khau phai it nhat 8 ki tu, bao gom chu hoa so va ky tu",
  password_confirmation_incorrect: "Nhap lai mat khau chua chinh xac",
  update_username:
    "Username gioi han trong khoan 3 - 17 ky tu va khong duoc phep chua ky tu dac biet",
  update_gender: "Du lieu voi tinh co van de",
  update_address: "Dia chi gioi hanh 3-30 ky tu",
  update_phone: "Bat dau bang so 0 va 10-11 ky tu",
  ticket_title: "Phai co chu de",
  ticket_text: "phai co noi dung"
};

export const transErrors = {
  account_in_use: "email already",
  account_undifine: "tai khoan nay khong ton tai",
  user_current_password_failed: "Mat khau hien tai khong chinh xac",
  token_undifine: "token khong ton tai",
  login_failed: "Sai tai khoan hoac mat khau!!",
  account_not_active: "tai khoan chua duoc active",
  avatar_type: "file khong hop le",
  avatar_size: "chi chap nhan file nho hon 2mb",
  user_expried: "Ban khong du quyen de thuc hien noi dung nay",
  rule_fullTicket:
    "Ban Khong the nhan them ticket hay hoan thanh ticket hien tai truoc",
  out_of_ticket: "Bạn không có đủ số ticket để đặt câu hỏi",
  no_ticketCreated: "Ban Khong co ticket nao",
  ticket_double: "Ban da nhan ticket nay roi",
  ticket_had_receiver: "Ticket này đã được nhận bởi user khác",
  tickket_null: "ticket không tồn tại",
  ticket_closed: "ticket đã bị đóng",
  user_not_found: "user nay khong6 ton tai",
  user_not_haveTicket: "Ban dang co gang dong 1 ticket khong phai cua ban",
  user_not_has_role: "Rất tiếc bạn không có quyền để làm việc này",
  server_error:
    "Co loi o phia server vui long lien he voi bo phan ho tro cua chung toi de bao cao loi nay",
  packet_not_found: "Goi nay khong ton tai, hoac da bi go bo vao luc nay",
  not_has_noti: "Ban khong co thong6 bao nao vao luc nay",
  token_fail: "xac thuc that bai",
  no_token_provide: "Khong co token trong req",
  token_invalid: "token không có giá trị"
};

export const transSuccess = {
  success: "Thao tác thành công",
  userCreated: userEmail => {
    return `tai khoan <strong>${userEmail}</strong> da duoc tao vui long kiem tra email`;
  },
  account_active: "kich hoat tai khoan thanh cong",
  login_success: username => {
    return `xin chao ${username}, chuc ban mot ngay tot lanh`;
  },
  logout_success: "Dang xuat tai khoan thanh cong",
  avatar_updated: "Cap nhat anh dai dien thanh cong",
  user_info_update: "Cap nhat thong tin thanh cong",
  user_password_updated: "Cap nhat mat khau thanh cong",
  unlike: "Ban da huy like nguoi khac",
  /**
   * ticket
   */
  ticket_created: "ticket dc tao thanh cong",
  ticket_received:
    "Nhan tich ket thanh cong hay bat dau tro chuyen voi khachhang cua ban",
  ticket_closed:
    "Đóng ticket thành công, Hay tiếp tục tạo ticket khác nếu bạn còn nhiều vấn đề thắc mắc",

  update_user_level: "Thay doi goi dich vu thanh cong"
};

export const transMail = {
  subject: "Ban da tao tai khoan",
  template: link => {
    return `
            <h2>nhan dc email nay vi da dang ky tai khoan tren ung dung</h2>
            <h3>click vao link duoi de xac nhan kick hoat tai khoan</h3>
            <h3><a href="${link}" target="blank">${link}</a></h3>
        `;
  },
  send_fail: "loi gui mail"
};
