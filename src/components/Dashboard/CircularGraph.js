import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const CircularGraph = ({ inventoryByCategory = []}) => {
  const [options, setOptions] = useState({
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: [],
    labels: [],
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const labels = inventoryByCategory?.map(item => item.categoryName);
    const seriesData = inventoryByCategory?.map(item => item.inventory);
    const colors = ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#4A90E2', '#5DADEC', '#98C1D9', '#6C8EAD', '#00B4D8', '#48CAE4', '#0077B6', '#023E8A', '#0096C7', '#8ECAE6', '#3A86FF'];

    setOptions(prevOptions => ({
      ...prevOptions,
      labels,
      colors: colors.slice(0, labels?.length),  
    }));

    setSeries(seriesData);
  }, [inventoryByCategory]);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Danh mục tồn kho
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-start justify-start gap-y-3">
        {options.labels?.map((item, index) => (
          <div key={index} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{ backgroundColor: options.colors[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {item}</span>
                <span> {series[index]}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularGraph;