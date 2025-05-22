//Checking if the user is logged in across all pages

// This script checks if the user is logged in and redirects to the login page if not
document.addEventListener('DOMContentLoaded', () => {
  const checkAuth = () => { 
      if (!sessionStorage.getItem("user-creds")) {
        window.location.href = "../index.html";
      }
    };
    
 checkAuth();     // Call the checkAuth function to check if the user is logged in else direct to the index page
 
    // It also greets the user by name on the landing page and shows/hides the admin menu based on user role
    let UserInfo=JSON.parse(sessionStorage.getItem("user-info"));  // Get the user info from session storage
    const GreetHead=document.getElementById('msg-body');
    const HideMenu =document.getElementById("admin-section")

    // Only show the menu nav link if the user role is admin
    if (HideMenu){
      if(UserInfo.role === "admin"){
        HideMenu.style.display ="block" ;   //Show the menu, only if the user is an admin
      }
      else{
        HideMenu.style.display ="none" ;  //Hide the menu, only if the user is not an admin
      }
    }

    //This is for the landing page to get the Name of the user
    if (GreetHead){
        GreetHead.innerText = `Welcome ${UserInfo.fname} ${UserInfo.surname}!`;
      }  

  
});