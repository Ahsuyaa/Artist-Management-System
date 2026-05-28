const API = "http://localhost:4000/api/auth";



function showLogin() {
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("homeScreen").classList.add("hidden");
}

function showRegister() {
  document.getElementById("registerScreen").classList.remove("hidden");
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("homeScreen").classList.add("hidden");
}

function showHome() {
  document.getElementById("homeScreen").classList.remove("hidden");
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.add("hidden");
}

//register

async function register() {

  const data = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("registerEmail").value,
    password: document.getElementById("registerPassword").value,
    phone: document.getElementById("phone") ? document.getElementById("phone").value : null,
    dob: document.getElementById("dob") ? document.getElementById("dob").value : null,
    gender: document.getElementById("gender") ? document.getElementById("gender").value : null,
    address: document.getElementById("address") ? document.getElementById("address").value : null,
    role: "artist"
  };

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    
  
    document.getElementById("registerMsg").innerText = result.message || result.error || "Registration complete!";

    if (res.ok) {
      // Clear registration inputs on success
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("registerEmail").value = "";
      document.getElementById("registerPassword").value = "";
    
      setTimeout(showLogin, 1500);
    }
  } catch (err) {
    document.getElementById("registerMsg").innerText = "Connection error. Is backend online?";
  }
}

//login
async function login() {
  const data = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  };

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    
    if (res.ok) {
      document.getElementById("loginMsg").innerText = "Login successful!";
      localStorage.setItem("token", result.token);
      showHome();
    } else {
      document.getElementById("loginMsg").innerText = result.error || result.message || "Invalid credentials";
    }
  } catch (err) {
    document.getElementById("loginMsg").innerText = "Cannot connect to server.";
  }
}

window.onload = showLogin;