const regex = {
  regexPhone: (phone) => {
    var pattern = /^\+?0\d{9}$/;
    // Mô tả của regex pattern:
    // ^         - Bắt đầu chuỗi
    // \+?       - Dấu "+" có thể có hoặc không
    // 0         - Chữ số 0
    // \d{9}     - Chính xác 9 chữ số (số điện thoại)
    // $         - Kết thúc chuỗi
    return pattern.test(phone);
  },
  regexPassword: (password) => {
    var pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Mô tả của regex pattern:
    // ^                    - Bắt đầu chuỗi
    // (?=.*[a-z])          - Chứa ít nhất một chữ cái viết thường
    // (?=.*[A-Z])          - Chứa ít nhất một chữ cái viết hoa
    // (?=.*\d)             - Chứa ít nhất một chữ số
    // (?=.*[@$!%*?&])      - Chứa ít nhất một ký tự đặc biệt trong danh sách @, $, !, %, *, ?, &
    // [A-Za-z\d@$!%*?&]{8,} - Bao gồm chữ cái, số và ký tự đặc biệt trong danh sách trên, ít nhất 8 ký tự
    // $                    - Kết thúc chuỗi

    // Kiểm tra tính hợp lệ của mật khẩu
    return pattern.test(password);
  },
  regexEmail: (email) => {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Mô tả của regex pattern:
    // ^              - Bắt đầu chuỗi
    // [^\s@]+        - Không chứa khoảng trắng hoặc dấu "@" (ít nhất một ký tự)
    // @              - Dấu "@"
    // [^\s@]+        - Không chứa khoảng trắng hoặc dấu "@" (ít nhất một ký tự)
    // \.             - Dấu chấm "."
    // [^\s@]+        - Không chứa khoảng trắng hoặc dấu "@" (ít nhất một ký tự)
    // $              - Kết thúc chuỗi

    // Kiểm tra tính hợp lệ của địa chỉ email
    return pattern.test(email);
  },
};
module.exports = regex;
