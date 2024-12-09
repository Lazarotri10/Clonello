
import { API_BASE_URL } from '/apiconfig.js';
import { createColumnElement, createTaskElement } from './elements.js';

export async function loadUserBoards() {
  try {
    const response = await fetch(`${API_BASE_URL}/Boards`);
    const boards = await response.json();

    const userBoardsDropdown = document.getElementById('user-boards-dropdown');
    userBoardsDropdown.innerHTML = '<option value="">Selecione um quadro</option>';

    boards.forEach(board => {
      const option = document.createElement('option');
      option.value = board.Id;
      option.textContent = board.Name;
      userBoardsDropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar os quadros do usuário:', error);
  }
}

export async function loadBoardById(boardId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Board?BoardId=${boardId}`);
    const board = await response.json();
    
    document.getElementById('current-board-name').textContent = board.Name;
    
    const columnsResponse = await fetch(`${API_BASE_URL}/ColumnByBoardId?BoardId=${boardId}`);
    const columns = await columnsResponse.json();
    
    const columnsContainer = document.getElementById('columns-container');
    columnsContainer.innerHTML = '';
    
    for (const column of columns) {
      const columnElement = createColumnElement(column);
      columnsContainer.appendChild(columnElement);
 
      const tasksResponse = await fetch(`${API_BASE_URL}/TasksByColumnId?ColumnId=${column.Id}`);
      const tasks = await tasksResponse.json();
      
      const taskList = columnElement.querySelector('.task-list');
      tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
      });
    }
  } catch (error) {
    console.error('Erro ao carregar o quadro:', error);
  }
}