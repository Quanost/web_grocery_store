export const validateRegister = (values, setErrors) => {
    let errors = {};
    let isValid = true;

    if (!values.firstName.trim()) {
        errors.firstName = 'Họ không được bỏ trống';
        isValid = false;
    }
    if (!values.lastName.trim()) {
        errors.lastName = 'Tên không được bỏ trống';
        isValid = false;
    }
    if (!values.email) {
        errors.email = 'Email không được bỏ trống';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email không hợp lệ. Ví dụ example@gmail.com';
        isValid = false;
    }
    if (!values.password) {
        errors.password = 'Mật khẩu không được bỏ trống';
        isValid = false;
    } else if (values.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        isValid = false;
    }
    if (!values.repeatPassword) {
        errors.repeatPassword = 'Nhập lại mật khẩu không được bỏ trống';
        isValid = false;
    } else if (values.repeatPassword !== values.password) {
        errors.repeatPassword = 'Nhập lại mật khẩu không khớp';
        isValid = false;
    }
    if (!values.phone) {
        errors.phone = 'Số điện thoại không được bỏ trống';
        isValid = false;
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(values.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ. Ví dụ 0312345678';
        isValid = false;
    }
    setErrors(errors)
    return isValid;
};