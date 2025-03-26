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
    });
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

  // Full view button
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
          window.location.href = 'index.html';
        }
      });
    });
  }


//Here is the function calculation of the Denominations
const calDenom = document.getElementById('calDenom');
if (calDenom) {
  calDenom.addEventListener('click', () => {
var totalCalculation=[];
 function innerHeight(id1,amount,id2){
        var inputs= document.getElementById(id1).value;
        var calculate=  amount * inputs
        if(inputs!==""){
          document.getElementById(id2).innerText= "GH₵"+calculate.toFixed(2)
          totalCalculation.push(calculate);
        }    
    }
    innerHeight("twoHundred",200,"answer1")
    innerHeight("oneHundred",100,"answer2")
    innerHeight("fifty",50,"answer3")
    innerHeight("twenty",20,"answer4")
    innerHeight("ten",10,"answer5")
    innerHeight("five",5,"answer6")
    innerHeight("two",2,"answer7")
    innerHeight("one",1,"answer8")
    innerHeight("twoP",2,"answer9")
    innerHeight("oneP",1,"answer10")
    innerHeight("fiftyP",0.5,"answer11")
    innerHeight("twentyP",0.2,"answer12")
    innerHeight("tenP",0.1,"answer13")

    const grandTotal= totalCalculation.reduce((sum,int)=>sum+int,0);
    document.getElementById("grandTot").innerText="Total: GH₵"+grandTotal.toFixed(2)
    totalCalculation=[0]   
  })
}

});