import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/css/jsvectormap.css';
import { useEffect, useState } from 'react';
import '../../ultils/map_vn';

const provinceIdMapping = {
    "An Giang": 1,
    "TP. Hồ Chí Minh": 31,
    "Bạc Liêu": 3,
    "Bến Tre": 7,
    "Bình Dương": 8, 
    "Bình Phước": 10,
    "Bình Thuận": 11,
    "Cà Mau": 12, //
    "Cần Thơ": 14,
    "Đắk Lắk": 16,
    "Đắk Nông": 17,
    "Đồng Nai": 18,
    "Đồng Tháp": 19,
    "Hậu Giang": 29,
    "Kiên Giang": 33,
    "Lâm Đồng": 38,
    "Long An": 39,
    "Khánh Hòa": 32,
    "Ninh Thuận": 43,
    "Sóc Trăng": 51,
    "Tây Ninh": 53,
    "Tiền Giang": 58,
    "Trà Vinh": 59,
    "Vĩnh Long": 61,
    "Bà Rịa - Vũng Tàu": 2,
};

const MapOrder = ({ dataOrder }) => {
    const [orderData, setOrderData] = useState({
        1: 9,
        2: 20,
        3: 60,
        4: 5,
        5: 20,
        6: 2,
        31: 70
    });

    useEffect(() => {
        if (dataOrder && Object.keys(dataOrder).length > 0) {
            const mapOne = new jsVectorMap({
                selector: '#mapOne',
                map: 'vn',
                zoomButtons: false,
                zoomOnScroll: true,
                regionStyle: {
                    initial: {
                        fill: '#C8D0D8',
                    },
                    hover: {
                        fillOpacity: 1,
                        fill: '#3056D3',
                    },
                },
                series: {
                    regions: [{
                        attribute: "fill",
                        legend: {
                            title: "Số lượng đơn hàng",
                        },
                        scale: {
                            'Nhỏ hơn 10': "#c79efd",
                            'Từ 10 - 50': "#ffc371",
                            'Từ 50 trở lên': "#08d191",
                        },
                        values: Object.fromEntries(
                            Object.entries(dataOrder).map(([province, orderCount]) => {
                                const provinceId = provinceIdMapping[province] | 1;
                                return [provinceId, orderCount <= 10 ? "Nhỏ hơn 10" : (orderCount <= 50 ? "Từ 10 - 50" : "Từ 50 trở lên")];
                            })
                        )
                    }]
                },
                regionLabelStyle: {
                    initial: {
                        fontFamily: 'Satoshi',
                        fontWeight: 'semibold',
                        fill: '#fff',
                    },
                    hover: {
                        cursor: 'pointer',
                    },
                },
                onRegionTooltipShow(event, tooltip, code) {
                    const orderCount = orderData[code] || 0;
                    tooltip.text(
                        `<h5>${tooltip.text()} - ${code}</h5>` +
                        `<p class="text-xs">Số đơn đã mua là ${orderCount}</p>`,
                        true
                    )
                },
            });
        }
    }, [dataOrder]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
                Khu vực đặt hàng
            </h4>
            <div id="mapOne" className="mapOne map-btn h-90"></div>
        </div>
    );
};

export default MapOrder;