//Checking if the user is logged in across all pages

document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = () => {
      if (!sessionStorage.getItem("user-creds")) {
        window.location.href = "./index.html";
      }
    };
  
    checkAuth();

    
let UserInfo=JSON.parse(sessionStorage.getItem("user-info"));
const GreetHead=document.getElementById('msg-body');
//This is for the landing page to get the Name of the user
if (GreetHead){
    GreetHead.innerText = `Welcome ${UserInfo.fname}!`;
  }    


  });