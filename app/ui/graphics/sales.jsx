'use client'
import React  from 'react'   
 
import dynamic from "next/dynamic" 
const ReactApexChart  = dynamic(() => import("react-apexcharts"), { ssr: false });
class SalesGraphic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: 'TEAM A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }, {
        name: 'TEAM B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: 'TEAM C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      }],
      options: {
        chart: {
          foreColor: 'var(--font-color)',
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        
        fill: {
          opacity: [0.85, 0.25, 1],
          
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Points',
          },
          min: 0
        },
        tooltip: { 
          theme:  'dark' ,
          shared: true,
          foreColor: 'var( --font-color-inverse)',

          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
        
            }
          }
        },
       
      },
    
    
    };
  }
  
  render() {
    return (
      <div>
        <div id="chart" suppressHydrationWarning >
          <label>RESUMEN </label>
         
          <ReactApexChart  
          options={this.state.options} 
          series={this.state.series} type="line" 
          height={350} 
          width={"100%"} 
          />
        
        </div> 
      </div>
    );
  }
}
 
export default SalesGraphic













// const ApexChart   = dynamic(() =>import('react-apexcharts'), 
// {
//   ssr: false ,
//   loading: () => <p>Cargando gráfico...</p>,

// // });
// import ReactApexChart from 'react-apexcharts'
// export default function SalesGraphic(){  
//   const [options, setOptions] = useState();
//   const chartRef = useRef(null);
//   const [series, setSeries] = useState()
//   const [load, setload] = useState(true)

//   useEffect(() => { 
//     setOptions({
//       chart: {
//         type: 'bar',
//         height: 350
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: '55%',
//           endingShape: 'rounded'
//         },
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         show: true,
//         width: 2,
//         colors: ['transparent']
//       },
//       xaxis: {
//         categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
//       },
//       yaxis: {
//         title: {
//           text: '$ (thousands)'
//         }
//       },
//       fill: {
//         opacity: 1
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return "$ " + val + " thousands"
//           }
//         }
//       }
//     })
//     setSeries([{
//       name: 'Net Profit',
//       data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
//     }, {
//       name: 'Revenue',
//       data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
//     }, {
//       name: 'Free Cash Flow',
//       data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
//     }] )
   
//     console.log('ReactApexChart', ReactApexChart)
   
//   }, []);
//   useEffect(() => {
//     if (ReactApexChart!==null) {
//       setload(false)
//     }
//   }, [ReactApexChart]);
//     return (
//       <div>
//        {
//           !load &&  
//           <ReactApexChart  
//           useRef={chartRef}
//           options={options} 
//           series={series} 
//           type="bar" 
//           height={350} />
//        }
//       </div>
     
//     )

// }
// const state = {
          
//   series: [{
//     name: 'TEAM A',
//     type: 'column',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//   }, {
//     name: 'TEAM B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//   }, {
//     name: 'TEAM C',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//     }],
//   options: {
//       chart: {
//         height: 350,
//         type: 'line'  ,
//         stacked: false,
//       },
//       stroke: {
//         width: [0, 2, 5],
//         curve: 'smooth'
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: '50%'
//         }
//       },
      
//       fill: {
//         opacity: [0.85, 0.25, 1],
//         gradient: {
//           inverseColors: false,
//           shade: 'light',
//           type: "vertical",
//           opacityFrom: 0.85,
//           opacityTo: 0.55,
//           stops: [0, 100, 100, 100]
//         }
//       },
//       labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
//         '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
//       ],
//       markers: {
//         size: 0
//       },
//       xaxis: {
//         type: 'datetime'
//       },
//       yaxis: {
//         title: {
//           text: 'Points',
//         },
//         min: 0
//       },
//       tooltip: {
//         shared: true,
//         intersect: false,
//         y: {
//           formatter: function (y) {
//             if (typeof y !== "undefined") {
//               return y.toFixed(0) + " points";
//             }
//             return y;
      
//           }
//         }
//       }
//   },
// }
 
 