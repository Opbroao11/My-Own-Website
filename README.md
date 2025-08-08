Minechosting Revamp - Static Site with Firebase Auth (Frontend-only)
=====================================================================

Files:
- index.html
- install.html
- store.html
- login.html
- signup.html
- dashboard.html
- css/style.css
- js/app.js

How to use:
-----------
1. Unzip and upload all files to a GitHub repository for Pages (or any static host).
2. Create a GitHub repo named: your-username.github.io if you want to host at root.
3. Push files to that repo and enable GitHub Pages (branch main, folder /).
4. Site will be available at https://your-username.github.io or your custom domain after DNS setup.

Firebase (Login / Signup):
--------------------------
This project uses Firebase Authentication (client-side) to provide basic signup/login that works on GitHub Pages.

To enable:
1. Go to https://console.firebase.google.com/ and create a new project.
2. In Project Settings -> General -> Add a web app. Copy the firebaseConfig object.
3. In js/app.js replace the firebaseConfig placeholders with your real keys.
4. In Firebase console, go to Authentication -> Sign-in method -> enable Email/Password.
5. Optionally configure Authorized domains to include your GitHub Pages domain (e.g. your-username.github.io) or your custom domain.

Security note:
--------------
This is a frontend-only demo. Don't store sensitive server secrets in the client. Firebase Auth is fine for authentication; for payments or server actions you will need a secure backend.

Deploy & Custom Domain:
-----------------------
Follow the GitHub Pages instructions you already have. Make sure your custom domain DNS points to GitHub Pages IPs and CNAME as previously discussed.

Happy testing!