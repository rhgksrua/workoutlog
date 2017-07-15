
function setToken() {
  const tokenElement = document.getElementById('token');
  const token = tokenElement.dataset.token;
  if (!token) {
    console.error('no token!');
    return;
  }
  localStorage.setItem('token', token);
  tokenElement.dataset.token = '';
}

function redirect() {
  window.setTimeout(function() {
    window.location.href = "http://localhost:3000";
  }, 3000);
}

setToken();
redirect();
