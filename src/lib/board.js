export const columns = [
  { id: 'todo', title: 'A fazer' },
  { id: 'doing', title: 'Em andamento' },
  { id: 'done', title: 'Concluído' },
];

export function createInitialTasks() {
  return {
    todo: [
      { id: 'task-1', title: 'Pesquisar sobre o dnd-kit' },
      { id: 'task-2', title: 'Preparar os slides' },
      { id: 'task-3', title: 'Ensaiar a apresentação' },
    ],
    doing: [
      { id: 'task-4', title: 'Montar o exemplo em React' },
      { id: 'task-5', title: 'Testar o arraste das tarefas' },
    ],
    done: [
      { id: 'task-6', title: 'Escolher o tema do trabalho' },
    ],
  };
}

export function addTask(tasks, title, id) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return tasks;
  return { ...tasks, todo: [...tasks.todo, { id, title: trimmedTitle }] };
}
