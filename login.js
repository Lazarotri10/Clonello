
import { API_BASE_URL } from '/apiconfig.js';

export async function handleLogin() {
  const email = document.getElementById('email').value;

  if (!email) {
    alert('Por favor, insira um email');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/GetPersonByEmail?Email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const user = await response.json();

    if (user) {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', user.Id); 
      window.location.href = 'Clonello.html';
    } else {
      const showError = document.getElementById('error');
      showError.innerHTML = "Email não encontrado, verifique seu email e tente novamente";
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Falha ao fazer login.');
  }
}