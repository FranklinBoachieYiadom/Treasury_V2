// This file contains the URLs for various web applications used in the church management system.
// const IncomeWebAppUrl = 'https://script.google.com/macros/s/AKfycbysaxL7UgzV_Yv-VduwVCePp8ovTHCoNczAl5IZoifFUwccGC1AK0vjQyhUDihACcTdAw/exec';
// const ExpenditureWebAppUrl = 'https://script.google.com/macros/s/AKfycbxcYgomulLwDcnuQJ57tLEcO2EOppdbZ2zvt-3AiLGQFU7FrSqlXwWntY8XdX7BwNB0EA/exec';
// const ConferenceWebAppUrl = 'https://script.google.com/macros/s/AKfycbznpfHgHXqR6kWIoMMb92qYzyjBxcfuZenrf9bCi8IJ3M13VCFxuylJK719XKUKWpy_Ig/exec';
// const DistrictWebAppUrl = 'https://script.google.com/macros/s/AKfycbwg9NlStQMKzUtxIdant2S8nHnTaunBmx7sxV0l8KDSpNN98y4EeOaRKStQgME5MsjDAA/exec';
// const LocalIncomeWebAppUrl = 'https://script.google.com/macros/s/AKfycbyTxc9AzAyIWkmamu3UD8XBNIzbaW9Tb2aWe1HBGYbIYtL9YYpGTXK4GtUwCjwSKOh6nQ/exec';

 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
 import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
 
 
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
 const db = getFirestore(app)
 //const auth = getAuth(app)

 // Fetch the URLs
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