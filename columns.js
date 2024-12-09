
import { API_BASE_URL } from '/apiconfig.js';
import { loadBoardById } from './boards.js';

export async function createNewColumn(boardId) {
  const columnName = prompt('Digite o nome da nova lista:');
  if (columnName) {
    try {
      const response = await fetch(`${API_BASE_URL}/Column`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          BoardId: parseInt(boardId),
          Name: columnName,
          Position: 0,
          IsActive: true
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar nova lista');
      }

      await loadBoardById(boardId);
    } catch (error) {
      console.error('Erro ao criar nova lista:', error);
      alert('Erro ao criar nova lista');
    }
  }
}