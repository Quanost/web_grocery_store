import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/css/jsvectormap.css';
import { useEffect, useState } from 'react';
import '../../ultils/map_vn'

const MapOrder = () => {
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
                    values: {
                        // But when dealing with regions's series you should specify the region key.
                        1: "Nhỏ hơn 10",
                        2: "Từ 10 - 50",
                        3: "Từ 50 trở lên",
                        4: "Nhỏ hơn 10",
                        5: "Từ 10 - 50",
                        6: "Nhỏ hơn 10",
                        31: "Từ 50 trở lên",
                    }
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


    }, [orderData]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
                Khu vực đặt hàng
            </h4>
            <div id="mapOne" className="mapOne map-btn h-90"></div>
        </div>
    );
};

export default MapOrder