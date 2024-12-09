import { API_BASE_URL } from '/apiconfig.js';
import { handleLogin } from './login.js';
import { loadUserBoards, loadBoardById } from './boards.js';
import { createNewColumn } from './columns.js';
import { addNewTask, updateTask } from './tasks.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Configura o alternador de tema
  const themeToggle = document.getElementById('theme');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark');
      document.getElementById("Dark-mode").innerHTML = document.body.classList.contains('Dark Mode');
    });
  } else {
    console.error('Elemento theme não encontrado');
  }

  // Configura o botão de login
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
  } else {
    console.error('Elemento login-button não encontrado');
  }

  // Configura o evento de pressionar Enter para login
  const clickEnter = addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  });

  // Configura o dropdown de quadros do usuário
  const userBoardsDropdown = document.getElementById('user-boards-dropdown');
  if (userBoardsDropdown) {
    userBoardsDropdown.addEventListener('change', async () => {
      const boardId = userBoardsDropdown.value;
      if (boardId) {
        await loadBoardById(boardId);
      } else {
        document.getElementById('board-details').innerHTML = '';
      }
    });
  }

  // Carrega os quadros do usuário
  await loadUserBoards();

  // Exibe o email do usuário armazenado
  const storedEmail = localStorage.getItem('userEmail');
  if (storedEmail) {
    document.getElementById('userEmail').textContent = storedEmail; 
  }

  // Configura o botão para adicionar nova coluna
  const addColumnButton = document.getElementById('add-column');
  if (addColumnButton) {
    addColumnButton.addEventListener('click', async () => {
      const boardId = document.getElementById('user-boards-dropdown').value;
      if (!boardId) {
        alert('Por favor, selecione um quadro primeiro');
        return;
      }
      await createNewColumn(boardId);
    });
  }

  // Configura o botão para criar novo quadro
  const createBoardButton = document.getElementById('create-board');
  if (createBoardButton) {
    createBoardButton.addEventListener('click', async () => {
      const boardName = prompt('Digite o nome do novo quadro:');
      if (boardName) {
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            throw new Error('Usuário não está logado');
          }

          const response = await fetch(`${API_BASE_URL}/Board`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              Name: boardName,
              IsActive: true,
              CreatedBy: parseInt(userId),
              UpdatedBy: parseInt(userId)
            })
          });

          if (!response.ok) {
            throw new Error('Erro ao criar o quadro');
          }

          const newBoard = await response.json();
          await loadUserBoards();
        
          const userBoardsDropdown = document.getElementById('user-boards-dropdown');
          if (userBoardsDropdown) {
            userBoardsDropdown.value = newBoard;
            await loadBoardById(newBoard);
          }
        } catch (error) {
          console.error('Erro ao criar o quadro:', error);
          alert('Erro ao criar o quadro. Verifique se está logado.');
        }
      }
    });
  }
});