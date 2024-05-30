import { useState, useEffect } from 'react';

const REGIONS = {
    HO_CHI_MINH: 'TP. Hồ Chí Minh',
    SOUTHERN_PROVINCES: [
        'Bình Định', 'Phú Yên', 'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận',
        'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng',
        'Bình Phước', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu',
        'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long',
        'Đồng Tháp', 'An Giang', 'Kiên Giang', 'Cần Thơ', 'Hậu Giang',
        'Sóc Trăng', 'Bạc Liêu', 'Cà Mau'
    ],
    OTHER_PROVINCES: []
};

const useShippingCost = (province) => {
    const [shippingCost, setShippingCost] = useState(0);

    useEffect(() => {
        if (!province) return;

        if (province === REGIONS.HO_CHI_MINH) {
            setShippingCost(25000);
        } else if (REGIONS.SOUTHERN_PROVINCES.includes(province)) {
            setShippingCost(30000);
        } else {
            setShippingCost(35000);
        }
    }, [province]);

    return shippingCost;
};

export default useShippingCost;