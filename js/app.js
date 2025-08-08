// App JS: small helper and Firebase Auth (compat libs used in HTML pages)
// ---- CONFIG ----
// Replace the firebaseConfig object below with your Firebase project's config.
// Create a Firebase project at https://console.firebase.google.com/ then add a Web App.
// Copy the config (apiKey, authDomain, projectId ...).
const firebaseConfig = {
  apiKey: "AIzaSyDAy94yKk5tnTENAefWX6IdGOeYBK1v7mk",
  authDomain: "login-up-450f2.firebaseapp.com",
  projectId: "login-up-450f2",
  storageBucket: "login-up-450f2.firebasestorage.app",
  messagingSenderId: "438597832719",
  appId: "1:438597832719:web:2927eb32613d6b7364137a",
  measurementId: "G-TQYRGK32DH"
};

// ---- Initialize Firebase (compat mode) ----
if (typeof firebase !== 'undefined' && firebase.apps === undefined) {
  // compat libs included on pages that need them; init only if available
}
try{
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
}catch(e){/* ignore if firebase not present */}

// Helper: redirect to dashboard if logged in/out for nav visibility
function updateNav(user){
  const login = document.getElementById('nav-login');
  const signup = document.getElementById('nav-signup');
  const dashboard = document.getElementById('nav-dashboard');
  if(!login || !signup || !dashboard) return;
  if(user){
    login.style.display='none';
    signup.style.display='none';
    dashboard.style.display='inline-block';
  }else{
    login.style.display='inline-block';
    signup.style.display='inline-block';
    dashboard.style.display='none';
  }
}

// Setup auth listeners if firebase available
if (typeof firebase !== 'undefined' && firebase.auth) {
  firebase.auth().onAuthStateChanged(user => {
    updateNav(user);
    // on dashboard page, show user
    if(location.pathname.endsWith('dashboard.html')){
      const ui = document.getElementById('user-info');
      if(user){
        ui.innerHTML = '<p>Signed in as <strong>'+ (user.email || user.uid) +'</strong></p>';
      }else{
        ui.innerHTML = '<p>Please <a href="login.html">login</a> to access your dashboard.</p>';
      }
    }
  });
}

// Login form
document.addEventListener('DOMContentLoaded', ()=>{
  // attach login handler if present
  const loginForm = document.getElementById('login-form');
  if(loginForm && firebase && firebase.auth){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-password').value;
      const msg = document.getElementById('login-msg');
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(()=>{ window.location.href='dashboard.html'; })
        .catch(err=>{ msg.textContent = err.message; });
    });
  }

  const signupForm = document.getElementById('signup-form');
  if(signupForm && firebase && firebase.auth){
    signupForm.addEventListener('submit', e=>{
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const pass = document.getElementById('signup-password').value;
      const msg = document.getElementById('signup-msg');
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(()=>{ window.location.href='dashboard.html'; })
        .catch(err=>{ msg.textContent = err.message; });
    });
  }

  // logout button
  const logoutBtn = document.getElementById('logout-btn');
  if(logoutBtn && firebase && firebase.auth){
    logoutBtn.addEventListener('click', ()=>{
      firebase.auth().signOut().then(()=>{ window.location.href='index.html'; });
    });
  }

  // buy buttons: data-link attribute
  document.querySelectorAll('.buy').forEach(b=>{
    b.addEventListener('click', ()=>{
      const l = b.getAttribute('data-link') || '#';
      window.open(l,'_blank');
    });
  });
});

// Simple protection for dashboard: redirect to login if not logged in
if(location.pathname.endsWith('dashboard.html')){
  // if firebase not loaded yet, wait for onAuthStateChanged; otherwise redirect after short timeout
  setTimeout(()=>{
    if(typeof firebase !== 'undefined' && firebase.auth){
      const user = firebase.auth().currentUser;
      if(!user){
        window.location.href = 'login.html';
      }
    }
  }, 800);
}
