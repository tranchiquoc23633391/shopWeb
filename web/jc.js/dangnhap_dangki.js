// Regex kiểm tra Họ và Tên (Ký tự đầu viết hoa, không chứa số)
const regexHoVaTen = /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯẠ-ỹ][a-zàáâãèéêìíòóôõùúăđĩũơưạ-ỹ]*(\s[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯẠ-ỹ][a-zàáâãèéêìíòóôõùúăđĩũơưạ-ỹ]*)*$/;

// Regex kiểm tra Tên Đăng Nhập (Không chứa số)
const regexTenDangNhap = /^[A-Za-z]+$/;

// Regex kiểm tra Email (Định dạng email hợp lệ)
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex kiểm tra Địa chỉ (Giới hạn 200 ký tự)
const regexDiaChi = /^.{1,200}$/;

// Regex kiểm tra Mật khẩu (Ít nhất 6 ký tự, chứa ít nhất một ký tự số và một ký tự hoa)
const regexMatKhau = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Hàm kiểm tra Xác nhận mật khẩu (Phải khớp với mật khẩu)
function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

// Hàm kiểm tra Ngày sinh (phải trước ngày hiện tại)
function validateNgaySinh(ngaySinh) {
    const today = new Date();
    const inputDate = new Date(ngaySinh);
    return inputDate < today; // Ngày sinh phải trước ngày hiện tại
}

// Hàm hiển thị lỗi
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = inputElement?.nextElementSibling;

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = "red";
    }
}

// Hàm xóa lỗi
function clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    const errorElement = inputElement?.nextElementSibling;

    if (errorElement) {
        errorElement.textContent = "";
    }
}

// Hàm kiểm tra từng trường input
function validateForm() {
    let isValid = true;

    const hoVaTen = document.getElementById('txtHoVaTen')?.value || '';
    const tenDangNhap = document.getElementById('txtTenDN')?.value || '';
    const email = document.getElementById('txtEmail')?.value || '';
    const diaChi = document.getElementById('txtDaiChi')?.value || '';
    const gioiTinh = document.getElementById('txtGioiTinh')?.value || '';
    const ngaySinh = document.getElementById('txtNgaySinh')?.value || '';
    const matKhau = document.getElementById('txtPass')?.value || '';
    const xacNhanMatKhau = document.getElementById('txtConfirmPass')?.value || '';

    // Kiểm tra Họ và Tên
    if (!regexHoVaTen.test(hoVaTen)) {
        showError('txtHoVaTen', 'Họ và Tên không hợp lệ! Vui lòng nhập đúng định dạng.');
        isValid = false;
    } else {
        clearError('txtHoVaTen');
    }

    // Kiểm tra Tên Đăng Nhập
    if (!regexTenDangNhap.test(tenDangNhap)) {
        showError('txtTenDN', 'Tên Đăng Nhập không hợp lệ! Vui lòng chỉ nhập chữ cái.');
        isValid = false;
    } else {
        clearError('txtTenDN');
    }

    // Kiểm tra Email
    if (!regexEmail.test(email)) {
        showError('txtEmail', 'Email không hợp lệ! Vui lòng nhập đúng định dạng.');
        isValid = false;
    } else {
        clearError('txtEmail');
    }

    // Kiểm tra Địa chỉ
    if (!regexDiaChi.test(diaChi)) {
        showError('txtDaiChi', 'Địa chỉ không hợp lệ! Vui lòng nhập tối đa 200 ký tự.');
        isValid = false;
    } else {
        clearError('txtDaiChi');
    }

    // Kiểm tra Giới tính
    if (!gioiTinh) {
        showError('txtGioiTinh', 'Vui lòng chọn giới tính.');
        isValid = false;
    } else {
        clearError('txtGioiTinh');
    }

    // Kiểm tra Ngày sinh
    if (!validateNgaySinh(ngaySinh)) {
        showError('txtNgaySinh', 'Ngày sinh không hợp lệ! Vui lòng chọn ngày trước ngày hiện tại.');
        isValid = false;
    } else {
        clearError('txtNgaySinh');
    }

    // Kiểm tra Mật khẩu
    if (!regexMatKhau.test(matKhau)) {
        showError('txtPass', 'Mật khẩu không hợp lệ! Mật khẩu phải có ít nhất 6 ký tự, bao gồm 1 chữ cái viết hoa và 1 chữ số.');
        isValid = false;
    } else {
        clearError('txtPass');
    }

    // Kiểm tra Xác nhận Mật khẩu
    if (!validateConfirmPassword(matKhau, xacNhanMatKhau)) {
        showError('txtConfirmPass', 'Xác nhận mật khẩu không khớp! Vui lòng kiểm tra lại.');
        isValid = false;
    } else {
        clearError('txtConfirmPass');
    }

    return isValid;
}

// Gắn sự kiện kiểm tra vào nút đăng ký
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerButton').addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn gửi form nếu có lỗi
        if (validateForm()) {
            alert('Đăng ký thành công!');
        }
    });
});