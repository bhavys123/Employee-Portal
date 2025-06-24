// Vanta Background
VANTA.NET({
  el: "#background",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00ffd1,
  backgroundColor: 0x0b1923
});

// Toggle login/signup
document.getElementById('showLogin').addEventListener('click', () => {
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
});

document.getElementById('showSignup').addEventListener('click', () => {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('signup-container').style.display = 'block';
});

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Registration successful! Please login.');
      document.getElementById('signup-container').style.display = 'none';
      document.getElementById('login-container').style.display = 'block';
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    alert('Network error');
  }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      window.location.href = 'dashboard.html';
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    alert('Network error');
  }
});
