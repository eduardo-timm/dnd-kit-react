import { useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { BoardColumn } from './components/BoardColumn';
import { addTask, columns, createInitialTasks } from './lib/board';

export default function App() {
  // Cada chave representa uma lista e guarda seus cartões na ordem de exibição.
  const [tasks, setTasks] = useState(createInitialTasks);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const snapshot = useRef(tasks);

  function handleAddTask(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((current) => addTask(current, title, crypto.randomUUID()));
    setTitle('');
    setMessage('Tarefa adicionada em A fazer.');
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Gerenciamento de listas</h1>
        <p>Arraste as tarefas para mudar a ordem ou mover entre as listas.</p>
      </header>

      <div className="toolbar">
        <form className="add-task-form" onSubmit={handleAddTask}>
          <label htmlFor="task-title">Nova tarefa</label>
          <div className="input-row">
            <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)}
              placeholder="Digite o nome da tarefa" maxLength={80} required />
            <button className="button" type="submit">Adicionar</button>
          </div>
        </form>
        <button className="reset-button" type="button" onClick={() => {
          setTasks(createInitialTasks());
          setTitle('');
          setMessage('Exemplo reiniciado.');
        }}>Reiniciar exemplo</button>
      </div>

      <DragDropProvider
        onDragStart={() => { snapshot.current = tasks; setMessage(''); }}
        onDragOver={(event) => {
          // O React controla a ordem dos cartões durante o arraste.
          event.preventDefault();
          if (event.operation.target) setTasks((current) => move(current, event));
        }}
        onDragEnd={(event) => {
          if (event.canceled || !event.operation.target) {
            setTasks(snapshot.current);
            setMessage('Movimento cancelado.');
          } else {
            setMessage('Tarefa movida.');
          }
        }}
      >
        <div className="board" aria-label="Quadro de tarefas">
          {columns.map((column) => (
            <BoardColumn key={column.id} column={column} tasks={tasks[column.id]} />
          ))}
        </div>
      </DragDropProvider>

      <p className="status" role="status">{message}</p>
    </main>
  );
}
