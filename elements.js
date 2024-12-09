import { addNewTask, updateTask } from './tasks.js';

export function createColumnElement(column) {
  // Cria o elemento da coluna
  const columnElement = document.createElement('div');
  columnElement.className = 'column';
  columnElement.innerHTML = `
    <div class="column-header">
      <h3 class="column-title">${column.Name}</h3>
      <div class="column-actions">
        <button class="add-task-btn" title="Adicionar tarefa">+</button>
      </div>
    </div>
    <div class="task-list"></div>
  `;
  
  // Adiciona evento para o botão de adicionar tarefa
  const addTaskBtn = columnElement.querySelector('.add-task-btn');
  addTaskBtn.addEventListener('click', () => addNewTask(column.Id));

  return columnElement;
}

export function createTaskElement(task) {
  // Cria o elemento da tarefa
  const taskElement = document.createElement('div');
  taskElement.className = 'task-card';
  taskElement.innerHTML = `
    <div class="task-content">
      <div class="task-title">${task.Title}</div>
      <div class="task-description">${task.Description || ''}</div>
    </div>
    <div class="task-actions">
      <button class="edit-task-btn" title="Editar tarefa">✎</button>
    </div>
  `;
  
  // Adiciona evento para o botão de editar tarefa
  const editBtn = taskElement.querySelector('.edit-task-btn');
  editBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const newTitle = prompt('Digite o novo título da tarefa:', task.Title);
    if (newTitle && newTitle !== task.Title) {
      await updateTask({
        ...task,
        Title: newTitle
      });
    }
  });
  
  return taskElement;
}