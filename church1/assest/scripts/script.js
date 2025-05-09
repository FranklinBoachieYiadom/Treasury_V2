document.addEventListener('DOMContentLoaded', () => {

  // Add Row button
  const addRowBtn = document.getElementById('addRowBtn');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      const table = document.getElementById('amountTable').getElementsByTagName('tbody')[0];
      const newRow = table.insertRow();

      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);

      // Set the row number
      cell1.innerHTML = table.rows.length;

      // Add the input for particulars
      const particularsInput = document.createElement('input');
      particularsInput.classList.add('particulars-input');
      particularsInput.type = 'text';
      particularsInput.placeholder = 'Enter particulars';
      particularsInput.setAttribute('list', 'particularsList'); // Link to datalist
      cell2.appendChild(particularsInput);

      // Add the input for amount
      const amountInput = document.createElement('input');
      amountInput.type = 'number';
      amountInput.classList.add('amount-input');
      amountInput.placeholder = 'Enter amount';
      amountInput.step='any';   // This allows for decimal numbers 
      cell3.appendChild(amountInput);

      // Set the ID of the amount input based on the particulars input value
      particularsInput.addEventListener('change', () => {
        amountInput.id = particularsInput.value.replace(/\s+/g, '-').toLowerCase();
        amountInput.name = particularsInput.value.replace(/\s+/g, '-').toUpperCase();
      });

      // Add event listener to calculate total when the amount input changes
      amountInput.addEventListener('input', calculateTotal);
    });
  }

   // Add event listeners to existing amount input fields
   const amountInputs = document.querySelectorAll('.amount-input');
   amountInputs.forEach(input => {
     input.addEventListener('input', calculateTotal);
   });
 
   // Function to calculate the total
   function calculateTotal() {
     let total = 0;
     const rows = document.getElementById('amountTable').getElementsByTagName('tr');
     for (let i = 0; i < rows.length; i++) {
       const amountInput = rows[i].querySelector('.amount-input');
       if (amountInput && amountInput.value) {
         total += parseFloat(amountInput.value);
       }
     }
     document.getElementById('totalAmount').textContent = `Total Amount: GH₵${total.toFixed(2)}`;
   }

  // Remove Row button
  const removeRowBtn = document.getElementById('removeRowBtn');
  if (removeRowBtn) {
    removeRowBtn.addEventListener('click', () => {
      const table = document.getElementById('amountTable').getElementsByTagName('tbody')[0];
      const rowCount = table.rows.length;
      if (rowCount > 0) {
        table.deleteRow(rowCount - 1);
      }
    });
  }

  // Calculate button
  const calculateBtn = document.getElementById('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      let total = 0;
      const rows = document.getElementById('amountTable').getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        const amountInput = rows[i].querySelector('.amount-input');
        if (amountInput && amountInput.value) {
          total += parseFloat(amountInput.value);
        }
      }
      document.getElementById('totalAmount').textContent = `Total Amount: GH₵${total.toFixed(2)}`;
    });
  }

  // Full view button (Its hidden on the screen)
  const fullBtn = document.getElementById('fullBtn');
  if (fullBtn) {
    fullBtn.addEventListener('click', () => {
      const amountTableData = [];
      const rows = document.getElementById('amountTable').getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        const particularsInput = rows[i].querySelector('.particulars-input');
        const amountInput = rows[i].querySelector('.amount-input');
        if (particularsInput && amountInput) {
          amountTableData.push({
            particulars: particularsInput.value,
            amount: parseFloat(amountInput.value) || 0,
          });
        }
      }
      localStorage.setItem('amountTableData', JSON.stringify(amountTableData));
      window.location.href = 'full-view.html';
    });
  }
  
  // Log out button
  const logOutButton = document.getElementById('log-out');
  if (logOutButton) {
    logOutButton.addEventListener('click', () => {
      Swal.fire({
        text: "Are you sure you want to log out?", icon: "warning", showCancelButton: true,
        confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Yes, Log out"
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.removeItem("user-creds");
          sessionStorage.removeItem("user-info");
          localStorage.removeItem("amountTableData");
          window.location.href = '../index.html';
        }
      });
    });
  }

  
//Here is the function for the cut-off table
const filterBtn = document.getElementById('filterBtn');
if (filterBtn){
  filterBtn.addEventListener('click', () => {
    document.getElementById('cut-off-tables').style.display = 'block';
    const fromDateInput = document.getElementById('fromDate').value;
    const toDateInput = document.getElementById('toDate').value;

    // Normalize the dates
    const fromDate = new Date(fromDateInput);
    fromDate.setHours(0, 0, 0, 0); // Set to start of the day

    const toDate = new Date(toDateInput);
    toDate.setHours(23, 59, 59, 999); // Set to end of the day

    const tableRows = document.querySelectorAll('#dataTable tbody tr, #dataTable2 tbody tr');
    let conferenceTotal = 0;
    let districtTotal = 0;

    tableRows.forEach(row => {
        const dateCell = row.cells[0]; // Assuming the first column contains the date
        const rowDate = new Date(dateCell.textContent.trim());

        if (fromDate && toDate) {
            if (rowDate >= fromDate && rowDate <= toDate) {
                row.style.display = ''; // Show the row

                // Calculate totals for visible rows
                const totalCell = row.cells[row.cells.length - 1]; // Assuming the last column is "Total"
                const totalValue = parseFloat(totalCell.textContent.trim()) || 0;

                if (row.closest('#dataTable')) {
                    conferenceTotal += totalValue; // Add to conference total
                } else if (row.closest('#dataTable2')) {
                    districtTotal += totalValue; // Add to district total
                }
            } else {
                row.style.display = 'none'; // Hide the row
            }
        } else {
            row.style.display = ''; // Show all rows if no date range is selected
        }
    });

    // Calculate the grand total
    const grandTotal = conferenceTotal + districtTotal;

    // Display the grand total
    const grandTotalElement = document.getElementById('grandTotal');
    if (grandTotalElement) {
        grandTotalElement.textContent = `Grand Total: GH₵${grandTotal.toFixed(2)}`;
    } else {
        const grandTotalDiv = document.createElement('div');
        grandTotalDiv.id = 'grandTotal';
        grandTotalDiv.style.fontWeight = 'bold';
        grandTotalDiv.style.marginTop = '20px';
        grandTotalDiv.textContent = `Grand Total: GH₵${grandTotal.toFixed(2)}`;
        document.getElementById('cut-off-tables').appendChild(grandTotalDiv);
    }
});
}


//Here is the function calculation of the Denominations
function calculateDenomination(id1, amount, id2) {
  const input = document.getElementById(id1).value;
  const calculate = amount * input;
  if (input !== "") {
    document.getElementById(id2).innerText = "GH₵" + calculate.toFixed(2);
    return calculate;
  }
  document.getElementById(id2).innerText = ""; // Clear the total if input is empty
  return 0;
}

// Function to calculate the grand total
function calculateGrandTotal() {
  const totalCalculation = [];
  totalCalculation.push(calculateDenomination("twoHundred", 200, "answer1"));
  totalCalculation.push(calculateDenomination("oneHundred", 100, "answer2"));
  totalCalculation.push(calculateDenomination("fifty", 50, "answer3"));
  totalCalculation.push(calculateDenomination("twenty", 20, "answer4"));
  totalCalculation.push(calculateDenomination("ten", 10, "answer5"));
  totalCalculation.push(calculateDenomination("five", 5, "answer6"));
  totalCalculation.push(calculateDenomination("two", 2, "answer7"));
  totalCalculation.push(calculateDenomination("one", 1, "answer8"));
  totalCalculation.push(calculateDenomination("twoP", 2, "answer9"));
  totalCalculation.push(calculateDenomination("oneP", 1, "answer10"));
  totalCalculation.push(calculateDenomination("fiftyP", 0.5, "answer11"));
  totalCalculation.push(calculateDenomination("twentyP", 0.2, "answer12"));
  totalCalculation.push(calculateDenomination("tenP", 0.1, "answer13"));

  const grandTotal = totalCalculation.reduce((sum, value) => sum + value, 0);
  document.getElementById("grandTot").innerText = "Total: GH₵" + grandTotal.toFixed(2);
}

// Add event listeners to all input fields in the denominations table
const denominationInputs = document.querySelectorAll("#denominations input[type='number']");
denominationInputs.forEach((input) => {
  input.addEventListener("input", calculateGrandTotal);
});


// Function to handle the click event for the "Expenses Records" link Dropdown
  // This function toggles the visibility of the submenu
  const expensesRecords = document.getElementById("expensesRecords");
  const expensesSubmenu = document.getElementById("expensesSubmenu");

  if (expensesRecords && expensesSubmenu) {
    expensesRecords.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      // Toggle the visibility of the submenu
      expensesSubmenu.style.display =
        expensesSubmenu.style.display === "block" ? "none" : "block";
    });
  }


});