//import * as firebase from "firebase";

let firebaseConfig = {
  apiKey: process.env,
  authDomain: "precallprep-c078b.firebaseapp.com",
  // databaseURL: "https://precallprep-c078b-default-rtdb.firebaseio.com",
  projectId: "precallprep-c078b",
  storageBucket: "precallprep-c078b.appspot.com",
  messagingSenderId: process.env,
  appId: process.env,
  measurementId: process.env
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let provider = new firebase.auth.OAuthProvider('microsoft.com');

let accessToken = '';

// optional for Azure AD users only
// provider.setCustomParameters({
//   //your Azure tenant ID
//   tenant: "3abef5f2-9f47-4b54-87d1-94d0317423f1"
// });

// set the persistence to session
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

// this scope is required for firebase to be able to push calendar events
provider.addScope('calendars.read');
provider.addScope('calendars.readWrite');

//sign in
function signIn(){
  firebase.auth().signInWithPopup(provider)
      .then(function(result){
          showWelcomeMessage(result.additionalUserInfo.profile.displayName);
          accessToken = result.credential.accessToken;
          console.log('Authentication successful');
          console.log(accessToken);
      })
      .catch(function(error) {
          console.log(`Error during authentication: ${error}`);
      });
}

function signOut(){
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      accessToken='';
      showSignOutMessage();
      console.log('user signed out');
    }).catch(function(error) {
      // An error happened.
      console.log(`Error during signOut: ${error}`);
    });
}

// reAuth to refresh token
function reAuth(){
  const user = firebase.auth().currentUser;
  user.reauthenticateWithPopup(provider)
    // User is re-authenticated with fresh tokens minted and
    // should be able to perform sensitive operations like event
    // deletion and update.
    // IdP data available in result.additionalUserInfo.profile.
    // Get the OAuth access token
    .then((result) => {
      accessToken = result.credential.accessToken;
      console.log('reAuthentication successful');
      //console.log(accessToken);
    })
    .catch((error) => {
      console.log(`Error during reAuthentication: ${error}`);
    });
}