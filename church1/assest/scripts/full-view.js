// Function to normalize particulars
function normalizeParticulars(particulars) {
    const lowerParticulars = particulars.toLowerCase();
    if (lowerParticulars.startsWith('tith')) {
      return 'Tithe';
    } else if (lowerParticulars.startsWith('c.b') || lowerParticulars.startsWith('cb') || lowerParticulars.startsWith('combine')) {
      return 'C.B.F';
    } else if (lowerParticulars.startsWith('loose')) {
      return 'Loose Offering';
    } else if (lowerParticulars.startsWith('thanks')) {
      return 'Thanksgiving';
    }
    return particulars;
  }
  
  // Function to populate the tables with data from localStorage
  function populateTables() {
    const amountTableData = JSON.parse(localStorage.getItem('fullViewTableData')) || [];
    const fullAmountTable = document.getElementById('fullAmountTable').getElementsByTagName('tbody')[0];
    const localFundTable = document.getElementById('localFundTable').getElementsByTagName('tbody')[0];
    const conferenceFundTable = document.getElementById('conferenceFundTable').getElementsByTagName('tbody')[0];
    const districtFundTable = document.getElementById('districtFundTable').getElementsByTagName('tbody')[0];
  
    let totalAmount = 0;
    let localFundTotal = 0;
    let conferenceFundTotal = 0;
    let districtFundTotal = 0;
  
    const preStatedParticulars = ['Tithe', 'C.B.F', 'Loose Offering', 'Thanksgiving'];
    const preStatedData = preStatedParticulars.map(particulars => ({
      particulars,
      amount: 0
    }));
  
    // Update pre-stated data with user input values
    amountTableData.forEach(row => {
      const normalizedParticulars = normalizeParticulars(row.particulars);
      const preStatedRow = preStatedData.find(preRow => preRow.particulars === normalizedParticulars);
      if (preStatedRow) {
        preStatedRow.amount += row.amount;
      } else {
        preStatedData.push({ particulars: normalizedParticulars, amount: row.amount });
      }
    });
  
    preStatedData.forEach((row, index) => {
      const { particulars, amount } = row;
      totalAmount += amount;
  
      // Add row to Full Amount Table
      const fullRow = fullAmountTable.insertRow();
      fullRow.insertCell(0).textContent = index + 1;
      fullRow.insertCell(1).textContent = particulars;
      fullRow.insertCell(2).textContent = amount.toFixed(2);
  
      // Add row to Local Fund Table
      if (particulars !== 'Tithe') {
        const localRow = localFundTable.insertRow();
        localRow.insertCell(0).textContent = localFundTable.rows.length + 1;
        localRow.insertCell(1).textContent = particulars;
        let localAmount = amount;
        if (['C.B.F', 'Loose Offering', 'Thanksgiving'].includes(particulars)) {
          localAmount *= 0.5;
        }
        localRow.insertCell(2).textContent = localAmount.toFixed(2);
        localFundTotal += localAmount;
      }
  
      // Add row to Conference Fund Table
      if (['Tithe', 'C.B.F', 'Loose Offering', 'Thanksgiving'].includes(particulars)) {
        const conferenceRow = conferenceFundTable.insertRow();
        conferenceRow.insertCell(0).textContent = conferenceFundTable.rows.length + 1;
        conferenceRow.insertCell(1).textContent = particulars;
        let conferenceAmount = amount;
        if (particulars === 'C.B.F' || particulars === 'Loose Offering' || particulars === 'Thanksgiving') {
          conferenceAmount *= 0.4;
        }
        conferenceRow.insertCell(2).textContent = conferenceAmount.toFixed(2);
        conferenceFundTotal += conferenceAmount;
      }
  
      // Add row to District Fund Table
      if (['C.B.F', 'Loose Offering', 'Thanksgiving'].includes(particulars)) {
        const districtRow = districtFundTable.insertRow();
        districtRow.insertCell(0).textContent = districtFundTable.rows.length + 1;
        districtRow.insertCell(1).textContent = particulars;
        const districtAmount = amount * 0.1;
        districtRow.insertCell(2).textContent = districtAmount.toFixed(2);
        districtFundTotal += districtAmount;
      }
    });
  
    // Add total row to Full Amount Table
    const fullTotalRow = fullAmountTable.insertRow();
    fullTotalRow.classList.add('total-row');
    fullTotalRow.insertCell(0).textContent = '';
    fullTotalRow.insertCell(1).textContent = 'Total';
    fullTotalRow.insertCell(2).textContent = totalAmount.toFixed(2);
  
    // Add total row to Local Fund Table
    const localTotalRow = localFundTable.insertRow();
    localTotalRow.classList.add('total-row');
    localTotalRow.insertCell(0).textContent = '';
    localTotalRow.insertCell(1).textContent = 'Total';
    localTotalRow.insertCell(2).textContent = localFundTotal.toFixed(2);
  
    // Add total row to Conference Fund Table
    const conferenceTotalRow = conferenceFundTable.insertRow();
    conferenceTotalRow.classList.add('total-row');
    conferenceTotalRow.insertCell(0).textContent = '';
    conferenceTotalRow.insertCell(1).textContent = 'Total';
    conferenceTotalRow.insertCell(2).textContent = conferenceFundTotal.toFixed(2);
  
    // Add total row to District Fund Table
    const districtTotalRow = districtFundTable.insertRow();
    districtTotalRow.classList.add('total-row');
    districtTotalRow.insertCell(0).textContent = '';
    districtTotalRow.insertCell(1).textContent = 'Total';
    districtTotalRow.insertCell(2).textContent = districtFundTotal.toFixed(2);
  }
  
  // Call the function to populate the tables when the page loads
  window.onload = populateTables;
