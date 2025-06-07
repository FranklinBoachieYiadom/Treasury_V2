
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
        
        
        const firebaseConfig = {
          apiKey: "AIzaSyB0TPaK5K_pJNjDOsyCylW_2aw3V0v0PDo",
          authDomain: "treasury-app-software.firebaseapp.com",
          projectId: "treasury-app-software",
          storageBucket: "treasury-app-software.firebasestorage.app",
          messagingSenderId: "783310358457",
          appId: "1:783310358457:web:b03e57d0da172e536c5868"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore()
        const auth = getAuth(app)

        // Fetch the URLs from Firestore
       async function fetchWebAppUrls() {
         const docRef = doc(db, "config", "WebUrls");
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
           const urls = docSnap.data();
           window.webAppUrls = urls; // Make globally available
           document.dispatchEvent(new Event('webAppUrlsReady')); // Fire event
           return urls;
         } else {
           throw new Error("No webAppUrls config found!");
         }
       }
       
       fetchWebAppUrls();


       // When the sign up (submit) button is clicked
        const submit= document.getElementById("submit");
        submit.addEventListener("click", function(event){
        event.preventDefault()
          // Show spinner
        spinner.style.display = 'block';

        let name=document.getElementById("name").value;
        let surname=document.getElementById("surname").value;
        let church=document.getElementById("church").value;
        let key=document.getElementById("key").value;
        let email=document.getElementById("signupEmail").value;
        let password=document.getElementById("signupPassword").value;
        let confirmPassword = document.getElementById("signupPasswordConfirm").value;
       
        // Validate name and surname
        if (name === "" || surname === "") {
            // Hide spinner
            spinner.style.display = 'none';
            Swal.fire({
                text: "Please fill in all fields.",
                icon: "error"
            });
            return; // Stop further execution
        }

        // Validate church selection
        if (church === "") {
            // Hide spinner
            spinner.style.display = 'none';
            Swal.fire({
                text: "Please select a church.",
                icon: "error"
            });
            return; // Stop further execution
        }

        // Validate Key Input selection
        if (key === "") {
            // Hide spinner
            spinner.style.display = 'none';
            Swal.fire({
                text: "Please enter your key.",
                icon: "error"
            });
            return; // Stop further execution
        }

         // Check if passwords match
         if (password !== confirmPassword) {
            // Hide spinner
            spinner.style.display = 'none';
            Swal.fire({
                text: "Passwords do not match. Please try again.",
                icon: "error"
            });
            return; // Stop further execution
        }


        // Validate church keys stored using Apps Script web app
        //const ChurchKeysWebUrl = "https://script.google.com/macros/s/AKfycbwel4EZjGWIgc8ZEEzW3Vvr_zlALahZI9PG5Lznw-PxBLAx65-vBR0kIxFT9gmoOxo4Lw/exec";
    //   document.addEventListener('webAppUrlsReady', function() {
        async function validateChurchKey(church, key) {
        const response = await fetch(window.webAppUrls.ChurchKeysWebUrl, {
                method: "POST",
                body: JSON.stringify({ church, key }),
                //headers: { "Content-Type": "application/json" }
            });
            return await response.json();
        }

        // Usage in your signup logic:
        validateChurchKey(church, key).then(result => {
        if (!result.valid) {
            spinner.style.display = "none";
            Swal.fire({
            text: "Invalid church key. Please enter the correct key for the selected church.",
            icon: "error"
            });
            return;
        }

        // If Church and keys are correct Continue with signup...
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed up 
            var ref = doc (db,"UserAuthList",userCredential.user.uid);
            await setDoc(ref,{
                fname:name,
                surname:surname,
                role:"member",
                church:church
            })

            // Send email verification
            sendEmailVerification(auth.currentUser)
            .then(() => {
                // Hide spinner
           spinner.style.display = 'none';
            Swal.fire({
                icon: "success",
                title: "Email Verification Sent",
                text: "Please click on the link sent to your Email to verify your account.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "login.html";
                        } 
                    })
                })
             })
        .catch((error) => {
            // Hide spinner
          spinner.style.display = 'none';

            let errorCode = error.code;
            let errorMessage = error.message;
            // Replace "Firebase:" with an empty string
            if (errorMessage.includes("Firebase:")) {
                    errorMessage = errorMessage.replace("Firebase:", "").trim();
                }
            Swal.fire({
            text: errorMessage,
            icon: "error"
          });  
            // ..
         });
      })
}); 

 //})// End of event listener for webAppUrlsReady

    // Toggle password visibility
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("signupPassword");
    const confirmPasswordField = document.getElementById("signupPasswordConfirm");
    togglePassword.addEventListener("change", function() {
        if (togglePassword.checked) {
            passwordField.type = "text";
            confirmPasswordField.type = "text";
        } else {
            passwordField.type = "password";
            confirmPasswordField.type = "password";
        }
    });

    // Prevent form submission on Enter key press
    const form = document.getElementById("signupForm");
    form.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
 });
   