import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    }
  },
};

const LineGraph = ({ dataMonth = [], dataYear= [] }) => {
  const monthlyData = new Array(12).fill(0);

  dataMonth?.forEach(item => {
    monthlyData[item.month - 1] = item.total;
  });

  const dataByMonth = {
    series: [
      {
        name: 'Tổng doanh thu',
        data: monthlyData,
      },
    ],
    categories: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    yaxis: {
      min: 0,
      max: Math.max(...monthlyData) + 10000, // Adjust the max value dynamically
    },
  };

  const yearlyData = dataYear?.map(item => item.total);
  const yearlyCategories = dataYear?.map(item => item.year.toString());

  const dataByYear = {
    series: [
      {
        name: 'Tổng doanh thu',
        data: yearlyData,
      },
    ],
    categories: yearlyCategories,
    yaxis: {
      min: 0,
      max: Math.max(...yearlyData) + 10000, // Adjust the max value dynamically
    },
  };

  const [state, setState] = useState(dataByMonth);

  const updateData = (timeframe) => {
    switch (timeframe) {
      case 'month':
        setState(dataByMonth);
        break;
      case 'year':
        setState(dataByYear);
        break;
      default:
        setState(dataByMonth);
        break;
    }
  };

  useEffect(() => {
    setState(dataByMonth);
  }, [dataMonth]);

 
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Tổng doanh thu</p>
              <p className="text-sm font-medium">01.01.2024 - 31.12.2024</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
              onClick={() => updateData('month')}
            >
              Tháng
            </button>
            <button
              className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
              onClick={() => updateData('year')}
            >
              Năm
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 dark:text-white">
          <ReactApexChart
            options={{ ...options, xaxis: { ...options.xaxis, categories: state.categories }, yaxis: state.yaxis }}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default LineGraph;