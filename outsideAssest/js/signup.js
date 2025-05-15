
      
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
        
        
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
       
        // Define church keys
        const churchKeys = {
            AshNorth: "KEY123",
            Church2: "KEY456",
            Church3: "KEY789",
            Church4: "KEY101",
            Church5: "KEY112",
        };
        
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

         // Validate church key
        if (churchKeys[church] !== key) {
            // Hide spinner
            spinner.style.display = "none";
            Swal.fire({
            text: "Invalid church key. Please enter the correct key for the selected church.",
            icon: "error",
            });
            return; // Stop further execution
        }

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
            // Hide spinner
        spinner.style.display = 'none';

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account created successfully",
                showConfirmButton: false,
                timer: 1500
            });
            // Wait for 10 seconds before redirecting
            setTimeout(() => {
              var targetPageUrl = "login.html";
              window.location.href = targetPageUrl;
            }, 1500); // 10000 milliseconds = 10 seconds
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
   