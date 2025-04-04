//Checking if the user is logged in across all pages

document.addEventListener('DOMContentLoaded', () => {
  const checkAuth = () => { 
      if (!sessionStorage.getItem("user-creds")) {
        window.location.href = "./index.html";
      }
    };

 checkAuth();
 

let UserInfo=JSON.parse(sessionStorage.getItem("user-info"));  // Get the user info from session storage
const GreetHead=document.getElementById('msg-body');
const Role =document.getElementById("admin-section")

// Only show the menu nav link if the user role is admin
if (Role){
  if(UserInfo.role === "admin"){
    Role.style.display ="block" ;
  }
}

//This is for the landing page to get the Name of the user
if (GreetHead){
    GreetHead.innerText = `Welcome ${UserInfo.fname} ${UserInfo.surname}!`;
  }    
});