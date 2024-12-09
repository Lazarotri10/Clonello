import { API_BASE_URL } from '/apiconfig.js';
import { loadBoardById } from './boards.js';

export async function createNewColumn(boardId) {
  // Solicita ao usuário o nome da nova coluna
  const columnName = prompt('Digite o nome da nova lista:');
  if (columnName) {
    try {
      // Envia uma requisição POST para criar a nova coluna
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

      // Recarrega o quadro para refletir a nova coluna
      await loadBoardById(boardId);
    } catch (error) {
      console.error('Erro ao criar nova lista:', error);
      alert('Erro ao criar nova lista');
    }
  }
}