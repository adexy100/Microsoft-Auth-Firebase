## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `app`             | Contains sample source files               |
| `FirebaseAuth.js` | Main authentication logic resides here (using Firebase Auth Popup flow).|
| `graph.js`        | Provides a helper function for calling MS Graph API. |
| `ui.js`           | Contains UI logic.                         |
| `index.html`      |  Contains the UI of the sample.            |
| `.gitignore`      | Define what to ignore at commit time.      |
| `package.json`    | Package manifest for npm.                  |
| `README.md`       | This README file.                          |
| `server.js`     | Implements a simple Node server to serve index.html.  |

## Prerequisites

[Node](https://nodejs.org/en/) must be installed to run this sample.

## Setup
There are three things we need to do to enable Firebase to work with Azure AD, before writing any code.

Create a Firebase project
Register an app in Firebase.
Register an app in Azure AD

1. In the Azure AD portal, select the App registrations blade and hit the New registration button, give your app a meaningful name, and press the Register button
2. Next, head to the Certificates & secrets blade to create a new secret. This secret will be used by Firebase to authenticate against AAD.
3. Make sure to copy the secret. Now, let's head back to our Firebase dashboard to configure our custom Authentication with Azure AD. Click on the Authentication option on the navigation bar, select the Sign-in method and click on Microsoft to configure the Azure AD settings.
4. On the new popup window, paste the Azure AD application Id and secret we created in the steps above. Make sure to toggle the "Enable" to true so that you can edit the settings. Next, copy the redirect URL so that we can finalize the Azure AD app registration with the right information.
5. Let's hop back to our Azure AD app registration in the Azure portal to finalize the configuration. Head to the Authentication blade and press the Add a platform.
6. In the Redirect URIs, add the URI that was provided in our Firebase configuration and press Configure. Unlike using a normal redirect URI, like http://localhost:<port> with this URI we instruct Azure AD to redirect the successful logins back to Firebase first, before returning the user back to the app.
7. The last (optional) step is to add any extra permissions to our app registration. This is required if you need to speak to another custom API (maybe your API?), Azure service, MS Graph etc. Let's head over to the API permissions and add an extra Graph permission to request access to the user's events. Open the API Permissions blade and click on the Add a permission button. Select MS Graph on the new tab.
8. Next, select Delegated permissions, search for Event.Read, and Event.ReadWrite select the permissions and click the Add permissions button.

## Running the sample

1. Open the .env file and provide the required configuration values.
2. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.
2. To start the sample application, run `npm start`.
3. Finally, open a browser and navigate to [http://localhost:3000](http://localhost:3000).

## Key concepts

This sample demonstrates the following firebase auth workflows:

* How to configure application parameters.
* How to sign-in with popup and redirect methods.
* How to sign-out.
* How to get user consent incrementally.
* How to acquire an access token and refresh token.
* How to make an API call with the access token.