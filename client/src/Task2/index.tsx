import  { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import * as React from 'react';

const LIGHT_THEME = {
  FG_COLOR: '#24292f',
  BG_COLOR: '#ffffff',
  PALLET: ['#5470c6', '#91cc75'],
};

const DARK_THEME = {
  FG_COLOR: '#c9d1d9',
  BG_COLOR: '#0d1118',
  PALLET: ['#58a6ff', '#3fb950'],
};

// interface BarsProps {
//   theme: 'light' | 'dark';
//   height: number;
//   legend1: string;
//   legend2: string;
//   yName1: string;
//   yName2: string;
//   data1: [string, number][];
//   data2: [string, number][];
// }

function Bars() {
//   const { theme, height, legend1, legend2, yName1, yName2, data1, data2 } =
//     props;

  const divEL = useRef(null);

//   const TH = theme == 'light' ? LIGHT_THEME : DARK_THEME;
  const option: echarts.EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        data: ['Growth', 'Budget 2011', 'Budget 2012'],
        itemGap: 5
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
        //   data: obama_budget_2012.names
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Budget (million USD)',
          axisLabel: {
            formatter: function (a: number) {
              a = +a;
              return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 94,
          end: 100
        },
        {
          type: 'inside',
          start: 94,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series: [
        {
          name: 'Budget 2011',
          type: 'bar',
        //   data: obama_budget_2012.budget2011List
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data: [120, 200, 150, 80, 70, 110, 130],

        },
        {
          name: 'Budget 2012',
          type: 'bar',
        //   data: obama_budget_2012.budget2012List
        data: [120, 200, 150, 80, 70, 110, 130],

        }
      ]
  };

  useEffect(() => {
    let chartDOM = divEL.current;
    const instance = echarts.init(chartDOM as any);

    return () => {
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    let chartDOM = divEL.current;
    const instance = echarts.getInstanceByDom(chartDOM as any);
    if (instance) {
      instance.setOption(option);
    }
  }, []);

  return <div ref={divEL} style={{  width: '100%', height:'500px'}}></div>;
};

const tooltipFormatter = (params: any) => {
  let res = `${params.seriesName} (${params.data[0]})<br/>
  ${params.marker}  ${params.data[1]}`;
  return res;
};

const formatNum = (num: number, index: number) => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    // { value: 1e6, symbol: "M" },
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(2).replace(rx, '$1') + si[i].symbol;
};

export default Bars;
