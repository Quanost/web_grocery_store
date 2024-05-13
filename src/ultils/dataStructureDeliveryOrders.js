export const dataCreateDelivery = {
    "payment_type_id": 2, // 1: Người gửi trả tiền, 2: Người nhận trả tiền
    "note": "", // optonal
    "required_note": { code: 'KHONGCHOXEMHANG', name: 'Không cho xem hàng' }, // KHONGCHOXEMHANG: Không được xem hàng, CHOTHUHANG: Người mua có thể yêu cầu xem và dùng thử hàng hóa, CHOXEMHANGKHONGTHU: Người mua có thể xem hàng nhưng không được dùng thử
    "from_name": "", // Tên người gửi
    "from_phone": "", // Số điện thoại người gửi
    "from_address": "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam", // Địa chỉ người gửi ví dụ: 72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam
    "from_ward_name": "Phường 14", // Phường/Xã người gửi
    "from_district_name": "Quận 10", // Quận/Huyện người gửi
    "from_province_name": "HCM", // Tỉnh/Thành phố người gửi
    "return_phone": "",
    "return_address": "",
    "return_district_id": null,
    "return_ward_code": "",
    "client_order_code": "",
    "to_name": "", // Tên người nhận
    "to_phone": "", // Số điện thoại người nhận
    "to_address": "", // Địa chỉ người nhận Ví dụ 72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam
    "to_ward_code": "20308", // Mã phường/xã người nhận Ví dụ: 20308
    "to_district_id": 1444, // Mã quận/huyện người nhận Ví dụ 1444
    "cod_amount": 200000, // Số tiền thu hộ tính bằng VND
    // "content": "Theo New York Times",
    "weight": 0, // Trọng lượng đơn hàng tính bằng gram. Max 30000gram
    "length": 0, // Chiều dài đơn hàng tính bằng cm. Max 150cm
    "width": 0, // Chiều rộng đơn hàng tính bằng cm. Max 150cm
    "height": 0, // Chiều cao đơn hàng tính bằng cm. Max 150cm
    // "pick_station_id": 1444,
    "deliver_station_id": null,
    // "insurance_value": 500000,
    "service_id": 0,
    "service_type_id": 2,
    "coupon": null,
    "pick_shift": [2, 3], // Ca lấy hàng 2: 12-18h, 3: 7-12h
    "items": [
        {
            "name": "", // Tên sản phẩm
            "code": "", // Mã sản phẩm
            "quantity": 1, // Số lượng sản phẩm
            "price": 0, // Giá sản phẩm tính bằng VND
            // "length": 12,
            // "width": 12,
            // "height": 12,
            // "weight": 1200, required
        }

    ]
}
