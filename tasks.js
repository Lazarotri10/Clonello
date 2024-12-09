
import { API_BASE_URL } from '/apiconfig.js';
import { loadBoardById } from './boards.js';

export async function addNewTask(columnId) {
  const taskTitle = prompt('Digite o título da tarefa:');
  if (taskTitle) {
    try {
      const response = await fetch(`${API_BASE_URL}/Task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ColumnId: columnId,
          Title: taskTitle,
          IsActive: true
        })
      });

      if (!response.ok) throw new Error('Erro ao criar tarefa');
      
      const boardId = document.getElementById('user-boards-dropdown').value;
      await loadBoardById(boardId);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }
}

export async function updateTask(task) {
  try {
    const response = await fetch(`${API_BASE_URL}/Task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar tarefa');
    }

    const boardId = document.getElementById('user-boards-dropdown').value;
    await loadBoardById(boardId);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    alert('Erro ao atualizar tarefa');
  }
}