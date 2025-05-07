document.addEventListener("DOMContentLoaded", () => {
    const ExpenditureWebAppUrl = 'https://script.google.com/macros/s/AKfycby9-laPphroGrCkAsLCIUhM9ZHXhzfB5AB_bW5013Kxi33_epoj47Zd2qKzZM3pxOxryQ/exec';
    const LocalIncomeWebAppUrl = 'https://script.google.com/macros/s/AKfycbxfRWuHaQ-lEvopSxkHOTXmeeWYAZ4TCx9NvUi3loXYmMjTfxq-D9VMIZY-KFOxDVNUGQ/exec';
  
    const spinnerIncomeExpenditure = document.getElementById('spinner5');
    const chartIncomeExpenditure = document.getElementById('morris-bar-chart');
    if (spinnerIncomeExpenditure) spinnerIncomeExpenditure.style.display = 'block';
  
      // Fetch Income, Expenditure Conference and District data concurrently
  Promise.all([
    fetch(ExpenditureWebAppUrl).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok for Expenditure');
      }
      return response.json();
    }),
    fetch(LocalIncomeWebAppUrl).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok for Localincome');
      }
      return response.json();
    })
  
  
  ])

  .then(([ expenditureData,  localData]) => {
 
    // Process Income and Expenditure for each month and save to session storage
    const monthlyIncome = {};
    const monthlyExpenditure = {};
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    // Process Expenditure for each month and save to session storage
    for (const month of months) {
      let income = null;
      for (const record of localData) {
        if (record[month] && !isNaN(record[month])) {
        income = parseFloat(record[month]);
        break;
        }
      }
      monthlyIncome[month] = income !== null ? income : 0; // Default to 0 if no valid data found
    }

    // Process Expenditure for each month and save to session storage
    for (const month of months) {
      let expenditure = null;
      for (const record of expenditureData) {
        if (record[month] && !isNaN(record[month])) {
          expenditure = parseFloat(record[month]);
          break;
        }
      }
      monthlyExpenditure[month] = expenditure !== null ? expenditure : 0; // Default to 0 if no valid data found
    }

    // Save monthly income to session storage
    sessionStorage.setItem('monthlyIncome', JSON.stringify(monthlyIncome));

    // Save monthly expenditure to session storage
    sessionStorage.setItem('monthlyExpenditure', JSON.stringify(monthlyExpenditure));


    const getmonthlyExpenditure = sessionStorage.getItem("monthlyExpenditure");
    const getmonthlyIncome = sessionStorage.getItem("monthlyIncome");
    if (getmonthlyExpenditure && getmonthlyIncome) {
    const expenditureData = JSON.parse(getmonthlyExpenditure);
    const incomeData = JSON.parse(getmonthlyIncome);

    (function($) {
        "use strict";
        // Morris bar chart
        Morris.Bar({
            element: 'morris-bar-chart',
            data: [{
                y: 'Jan',
                a: incomeData['JAN'],
                b: expenditureData['JAN']
            }, {
                y: 'Feb',
                a: incomeData['FEB'],
                b: expenditureData['FEB']
            }, {
                y: 'Mar',
                a: incomeData['MAR'],
                b: expenditureData['MAR']
            }, {
                y: 'Apr',
                a: incomeData['APR'],
                b: expenditureData['APR']
            }, {
                y: 'May',
                a: incomeData['MAY'],
                b: expenditureData['MAY']
            }, {
                y: 'Jun',
                a: incomeData['JUN'],
                b: expenditureData['JUN']
            }, {
                y: 'Jul',
                a: incomeData['JUL'],
                b: expenditureData['JUL']
            }, {
                y: 'Aug',
                a: incomeData['AUG'],
                b: expenditureData['AUG']
            }, {
                y: 'Sep',
                a: incomeData['SEP'],
                b: expenditureData['SEP']
            }, {
                y: 'Oct',
                a: incomeData['OCT'],
                b: expenditureData['OCT']
            }, {
                y: 'Nov',
                a: incomeData['NOV'],
                b: expenditureData['NOV']
            }, {
                y: 'Dec',
                a: incomeData['DEC'],
                b: expenditureData['DEC']
            }],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Inc', 'Exp'],
            // barColors: ['#343957', '#5873FE'],
            barColors: ['#5873FE', '#FF0000'],
            hideHover: 'auto',
            gridLineColor: '#eef0f2',
            resize: true
        });
    })(jQuery);

    }

})
.catch(error => {
  console.error('Error fetching data:', error);
})
    .finally(() => {
    // Hide spinner after data is fetched or if there's an error
    if (spinnerIncomeExpenditure) spinnerIncomeExpenditure.style.display = 'none';
    if (chartIncomeExpenditure) chartIncomeExpenditure.style.display = 'block';
    });

});





























    // $('#info-circle-card').circleProgress({
    //     value: 0.70,
    //     size: 100,
    //     fill: {
    //         gradient: ["#a389d5"]
    //     }
    // });

    // $('.testimonial-widget-one .owl-carousel').owlCarousel({
    //     singleItem: true,
    //     loop: true,
    //     autoplay: false,
    //     //        rtl: true,
    //     autoplayTimeout: 2500,
    //     autoplayHoverPause: true,
    //     margin: 10,
    //     nav: false,
    //     dots: false,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 1
    //         },
    //         1000: {
    //             items: 1
    //         }
    //     }
    // });

    // $('#vmap13').vectorMap({
    //     map: 'usa_en',
    //     backgroundColor: 'transparent',
    //     borderColor: 'rgb(88, 115, 254)',
    //     borderOpacity: 0.25,
    //     borderWidth: 1,
    //     color: 'rgb(88, 115, 254)',
    //     enableZoom: true,
    //     hoverColor: 'rgba(88, 115, 254)',
    //     hoverOpacity: null,
    //     normalizeFunction: 'linear',
    //     scaleColors: ['#b6d6ff', '#005ace'],
    //     selectedColor: 'rgba(88, 115, 254, 0.9)',
    //     selectedRegions: null,
    //     showTooltip: true,
    //     // onRegionClick: function(element, code, region) {
    //     //     var message = 'You clicked "' +
    //     //         region +
    //     //         '" which has the code: ' +
    //     //         code.toUpperCase();

    //     //     alert(message);
    //     // }
    // });

    // var nk = document.getElementById("sold-product");
    // // nk.height = 50
    // new Chart(nk, {
    //     type: 'pie',
    //     data: {
    //         defaultFontFamily: 'Poppins',
    //         datasets: [{
    //             data: [45, 25, 20, 10],
    //             borderWidth: 0,
    //             backgroundColor: [
    //                 "rgba(89, 59, 219, .9)",
    //                 "rgba(89, 59, 219, .7)",
    //                 "rgba(89, 59, 219, .5)",
    //                 "rgba(89, 59, 219, .07)"
    //             ],
    //             hoverBackgroundColor: [
    //                 "rgba(89, 59, 219, .9)",
    //                 "rgba(89, 59, 219, .7)",
    //                 "rgba(89, 59, 219, .5)",
    //                 "rgba(89, 59, 219, .07)"
    //             ]

    //         }],
    //         labels: [
    //             "one",
    //             "two",
    //             "three",
    //             "four"
    //         ]
    //     },
    //     options: {
    //         responsive: true,
    //         legend: false,
    //         maintainAspectRatio: false
    //     }
    // });





// (function($) {
//     "use strict";

//     var data = [],
//         totalPoints = 300;

//     function getRandomData() {

//         if (data.length > 0)
//             data = data.slice(1);

//         // Do a random walk

//         while (data.length < totalPoints) {

//             var prev = data.length > 0 ? data[data.length - 1] : 50,
//                 y = prev + Math.random() * 10 - 5;

//             if (y < 0) {
//                 y = 0;
//             } else if (y > 100) {
//                 y = 100;
//             }

//             data.push(y);
//         }

//         // Zip the generated y values with the x values

//         var res = [];
//         for (var i = 0; i < data.length; ++i) {
//             res.push([i, data[i]])
//         }

//         return res;
//     }

//     // Set up the control widget

//     var updateInterval = 30;
//     $("#updateInterval").val(updateInterval).change(function() {
//         var v = $(this).val();
//         if (v && !isNaN(+v)) {
//             updateInterval = +v;
//             if (updateInterval < 1) {
//                 updateInterval = 1;
//             } else if (updateInterval > 3000) {
//                 updateInterval = 3000;
//             }
//             $(this).val("" + updateInterval);
//         }
//     });

//     var plot = $.plot("#cpu-load", [getRandomData()], {
//         series: {
//             shadowSize: 0 // Drawing is faster without shadows
//         },
//         yaxis: {
//             min: 0,
//             max: 100
//         },
//         xaxis: {
//             show: false
//         },
//         colors: ["#007BFF"],
//         grid: {
//             color: "transparent",
//             hoverable: true,
//             borderWidth: 0,
//             backgroundColor: 'transparent'
//         },
//         tooltip: true,
//         tooltipOpts: {
//             content: "Y: %y",
//             defaultTheme: false
//         }


//     });

//     function update() {

//         plot.setData([getRandomData()]);

//         // Since the axes don't change, we don't need to call plot.setupGrid()

//         plot.draw();
//         setTimeout(update, updateInterval);
//     }

//     update();


// })(jQuery);


// const wt = new PerfectScrollbar('.widget-todo');
// const wtl = new PerfectScrollbar('.widget-timeline');