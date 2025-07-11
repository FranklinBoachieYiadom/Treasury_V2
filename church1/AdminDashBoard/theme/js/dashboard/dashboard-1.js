//document.addEventListener("DOMContentLoaded", () => {

   document.addEventListener('webAppUrlsReady', function() {
    // const ExpenditureWebAppUrl = 'https://script.google.com/macros/s/AKfycby9-laPphroGrCkAsLCIUhM9ZHXhzfB5AB_bW5013Kxi33_epoj47Zd2qKzZM3pxOxryQ/exec';
    // const LocalIncomeWebAppUrl = 'https://script.google.com/macros/s/AKfycbwJtMQTFn6sIT2z06yDEBzo39NLYURzkeECRKy6rep9WaTKZOWSCS7Y38bxCa63TBZDnw/exec';
  
    const spinnerIncomeExpenditure = document.getElementById('spinner5');
    const chartIncomeExpenditure = document.getElementById('morris-bar-chart');
    if (spinnerIncomeExpenditure) spinnerIncomeExpenditure.style.display = 'block';
  
      // Fetch Income, Expenditure Conference and District data concurrently
  Promise.all([
    fetch(window.webAppUrls.ExpenditureWebAppUrl).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok for Expenditure');
      }
      return response.json();
    }),
    fetch(window.webAppUrls.LocalIncomeWebAppUrl).then(response => {
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
    // Show chart after data is fetched or if there's an error
    if (chartIncomeExpenditure) chartIncomeExpenditure.style.display = 'block';
    });

});

