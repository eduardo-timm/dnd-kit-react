import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import { TaskCard } from './TaskCard';

export function BoardColumn({ column, tasks }) {
  // A lista continua aceitando cartões mesmo quando está vazia.
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    accept: 'task',
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <section ref={ref} className={`column ${isDropTarget ? 'drop-target' : ''}`} aria-label={`Lista ${column.title}`}>
      <header className="column-header">
        <h2>{column.title}</h2>
        <span className="count" aria-label={`${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`}>{tasks.length}</span>
      </header>
      <div className="task-list">
        {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} column={column.id} />)}
        {tasks.length === 0 && <p className="empty-list">Solte uma tarefa aqui.</p>}
      </div>
    </section>
  );
}
