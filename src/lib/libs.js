export const getToken = () => {
  const jwt = localStorage.getItem('token');
  if (!jwt) return false;
  if (jwt.length < 10) return false;
  return jwt;
}


